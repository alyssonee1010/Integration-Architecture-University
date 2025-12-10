// camundaWorker.js
require('dotenv').config(); // optional, if you use .env

const { Client, logger } = require('camunda-external-task-client-js');
const axios = require('axios');

const connectDB = require('./db');
const {
  createSocialPerformanceRecord,
} = require('./services/salesmen');

// --- Camunda client config ---
const client = new Client({
  baseUrl: process.env.CAMUNDA_URL || 'http://localhost:8080/engine-rest',
  use: logger,
  asyncResponseTimeout: 30000,
});

// --- Helper to turn JSON-ish map into plain JS object ---
function toObject(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;

  try {
    return JSON.parse(String(raw));
  } catch (e) {
    return {};
  }
}

// Helper: average of two 1..5 values, rounded
function avgRounded(a, b) {
  const n1 = Number(a || 0);
  const n2 = Number(b || 0);
  const avg = (n1 + n2) / 2;
  const rounded = Math.round(avg);

  // clamp between 1 and 5 to satisfy isPerformanceRecordValid
  if (rounded < 1) return 1;
  if (rounded > 5) return 5;
  return rounded;
}

// ============================================================================
// 1) store_performance – write performanceRecord into existing Salesman model
// ============================================================================
client.subscribe('store_performance', async ({ task, taskService }) => {
  try {
    const vars = task.variables;

    // use the form field key
    const salesmanId    = vars.get('salesman_id');   // <--- from form
    const supervisorRaw = vars.get('supervisor');
    const peerRaw       = vars.get('peer');

    if (!salesmanId) {
      throw new Error('salesman_id process variable is required for store_performance');
    }

    const supervisor = toObject(supervisorRaw);
    const peer       = toObject(peerRaw);

    const year = new Date().getFullYear(); // or use a form field / process var if you prefer

    const record = {
      year,
      leadership_competence: avgRounded(supervisor.leadership,  peer.leadership),
      openness_employees:    avgRounded(supervisor.openness,    peer.openness),
      attitude_clients:      avgRounded(supervisor.attitude,    peer.attitude),
      communication:         avgRounded(supervisor.communication, peer.communication),
      integrity_company:     avgRounded(supervisor.integrity,   peer.integrity),
    };

    const created = await createSocialPerformanceRecord(salesmanId, record);

    console.log('Created performance record for salesman', salesmanId, '=>', created);

    await taskService.complete(task);
  } catch (err) {
    console.error('Error in store_performance worker', err);
    await taskService.handleFailure(task, {
      errorMessage: err.message,
      errorDetails: err.stack,
      retries: 0,
      retryTimeout: 0,
    });
  }
});


// ============================================================================
// 2) store_bonus – send bonus to OrangeHRM
// ============================================================================

// Configure OrangeHRM client (adjust URL to your instance)
const orangeApi = axios.create({
  baseURL: process.env.ORANGEHRM_BASE_URL
});

// For now, use static token from env (adapt to real auth later)
async function getOrangeToken() {
  return process.env.ORANGEHRM_ACCESS_TOKEN || '';
}

client.subscribe('store_bonus', async ({ task, taskService }) => {
  try {
    const vars = task.variables;

    // OrangeHRM side id – from form
    const employeeId  = vars.get('salesman_ohrm_id') || vars.get('salesman_id');
    const bonusAmount = Number(vars.get('bonusAmount') || 0);
    const bonusScore  = Number(vars.get('bonusScore') || 0);

    if (!employeeId) {
      throw new Error('salesman_ohrm_id (or salesman_id) process variable is required for store_bonus');
    }

    const token = await getOrangeToken();

    const url = `/pim/employees/${employeeId}/salary-components`; // adjust to your real API

    const payload = {
      salaryComponentId: 'BONUS',
      amount: bonusAmount,
      currencyType: 'EUR',
      comment: `Social performance bonus (score: ${bonusScore})`,
    };

    await orangeApi.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Sent bonus ${bonusAmount} for employee ${employeeId} to OrangeHRM`);

    await taskService.complete(task);
  } catch (err) {
    console.error('Error in store_bonus worker', err);
    await taskService.handleFailure(task, {
      errorMessage: err.message,
      errorDetails: err.stack,
      retries: 0,
      retryTimeout: 0,
    });
  }
});


// ============================================================================
// Bootstrap DB + worker
// ============================================================================
(async () => {
  await connectDB();
  console.log('MongoDB connected (worker)');

  console.log('Camunda worker started. Listening for external tasks...');
})();
