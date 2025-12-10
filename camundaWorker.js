// camundaWorker.js
require('dotenv').config();

const { Client, logger } = require('camunda-external-task-client-js');
const connectDB = require('./db');

const {
  createSocialPerformanceRecord,
} = require('./services/salesmen');

const {
  createBonusSalaryOfEmployee,
} = require('./services/orangehrm');

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

function rating(obj, key) {
  if (!obj) return 0;
  const v = obj[key];
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return n;
}

// ============================================================================
// 1) store_performance – write performanceRecord into existing Salesman model
// ============================================================================
client.subscribe('store_performance', async ({ task, taskService }) => {
  try {
    const vars = task.variables;

    // 1) ID from form
    const salesmanId = vars.get('salesman_id');   // from form
    const supervisorRaw = vars.get('supervisor');
    const peerRaw = vars.get('peer');

    if (!salesmanId) {
      throw new Error('salesman_id process variable is required for store_performance');
    }

    // 2) Year from form (id: year); fallback to current year
    const yearVar = vars.get('year');
    let year = Number(yearVar);
    if (!Number.isInteger(year)) {
      year = new Date().getFullYear();
    }

    // 3) Convert JSON-ish vars to plain objects
    const supervisor = toObject(supervisorRaw);
    const peer = toObject(peerRaw);

    // 4) Read raw ratings from both sources
    const supLeadership = rating(supervisor, 'leadership');
    const peerLeadership = rating(peer, 'leadership');

    const supOpenness = rating(supervisor, 'openness');
    const peerOpenness = rating(peer, 'openness');

    const supAttitude = rating(supervisor, 'attitude');
    const peerAttitude = rating(peer, 'attitude');

    const supCommunication = rating(supervisor, 'communication');
    const peerCommunication = rating(peer, 'communication');

    const supIntegrity = rating(supervisor, 'integrity');
    const peerIntegrity = rating(peer, 'integrity');

    // 5) Build performance record according to your new schema:
    //    each metric is [ supervisorValue, peerValue ]
    const record = {
      year,
      leadership_competence: [supLeadership,   peerLeadership],
      openness_employees:    [supOpenness,     peerOpenness],
      attitude_clients:      [supAttitude,     peerAttitude],
      communication:         [supCommunication, peerCommunication],
      integrity_company:     [supIntegrity,    peerIntegrity],
    };

    // 6) Store via your existing service
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
// 2) store_bonus – send bonus to OrangeHRM via existing service
// ============================================================================
client.subscribe('store_bonus', async ({ task, taskService }) => {
  try {
    const vars = task.variables;

    // OrangeHRM "employee code" — from form
    const employeeCode = vars.get('salesman_ohrm_id') || vars.get('salesman_id');
    const bonusAmount = Number(vars.get('bonusAmount') || 0);

    // Same year as used for performance record
    const yearVar = vars.get('year');
    let year = Number(yearVar);
    if (!Number.isInteger(year)) {
      year = new Date().getFullYear();
    }

    if (!employeeCode) {
      throw new Error('salesman_ohrm_id (or salesman_id) process variable is required for store_bonus');
    }

    if (!Number.isFinite(bonusAmount) || bonusAmount <= 0) {
      throw new Error(`Invalid bonusAmount: ${bonusAmount}`);
    }

    // Use your existing OrangeHRM service abstraction
    await createBonusSalaryOfEmployee(employeeCode, {
      year,
      value: bonusAmount,
    });

    console.log(`Created OrangeHRM bonus salary for employee code ${employeeCode}: year=${year}, value=${bonusAmount}`);

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
