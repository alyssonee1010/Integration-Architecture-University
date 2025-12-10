// controllers/salesman.js
const {
  getAllSalesmen,
  getSalesmanById,
  getSocialPerformanceRecordBySalesmen,
  getSocialPerformanceRecordBySalesmenByYear,
  createSocialPerformanceRecord,
  createSalesMan,
  deleteSalesMan,
  deleteSocialPerformanceRecords,
  updateSalesMan,
} = require("../services/salesmen");

// Helper to map service errors to HTTP status codes (simple version)
function toStatusCode(err) {
  // You can enhance this later with custom error types
  return 400;
}

// GET /salesmen
async function handleGetAllSalesmen(req, res, next) {
  try {
    const salesmen = await getAllSalesmen();
    res.json(salesmen);
  } catch (err) {
    next(err);
  }
}

// GET /salesmen/:id
async function handleGetSalesmanById(req, res, next) {
  try {
    const { id } = req.params;
    const salesman = await getSalesmanById(id);
    if (!salesman) {
      return res.status(404).json({ message: `Salesman with id ${id} not found.` });
    }
    res.json(salesman);
  } catch (err) {
    next(err);
  }
}

// POST /salesmen
async function handleCreateSalesman(req, res, next) {
  try {
    const { firstname, lastname } = req.body;
    const doc = await createSalesMan({ firstname, lastname });
    res.status(201).json(doc);
  } catch (err) {
    const status = toStatusCode(err);
    res.status(status).json({ message: err.message });
  }
}

// PUT /salesmen/:id
async function handleUpdateSalesman(req, res, next) {
  try {
    const { id } = req.params;
    const record = req.body;

    const updated = await updateSalesMan(id, record);
    res.json(updated);
  } catch (err) {
    if (err.message && err.message.startsWith("No salesman with id")) {
      return res.status(404).json({ message: err.message });
    }
    const status = toStatusCode(err);
    res.status(status).json({ message: err.message });
  }
}

// DELETE /salesmen/:id
async function handleDeleteSalesman(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await deleteSalesMan(id);
    if (!deleted) {
      return res.status(404).json({ message: `Salesman with id ${id} not found.` });
    }
    // 204 = No Content
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// GET /salesmen/:id/performance-records
async function handleGetRecordsById(req, res, next) {
  try {
    const { id } = req.params;
    const records = await getSocialPerformanceRecordBySalesmen(id);
    if (records === null) {
      return res.status(404).json({ message: `Salesman with id ${id} not found.` });
    }
    res.json(records);
  } catch (err) {
    next(err);
  }
}

// GET /salesmen/:id/performance-records/:year
async function handleGetRecordsByIdByYear(req, res, next) {
  try {
    const { id, year } = req.params;
    const record = await getSocialPerformanceRecordBySalesmenByYear(id, year);

    if (record === null) {
      return res.status(404).json({
        message: `Performance record for salesman ${id} and year ${year} not found.`,
      });
    }

    res.json(record);
  } catch (err) {
    next(err);
  }
}

// POST /salesmen/:id/performance-records
async function handleCreateRecord(req, res, next) {
  try {
    const { id } = req.params;
    const record = req.body;

    const created = await createSocialPerformanceRecord(id, record);
    res.status(201).json(created);
  } catch (err) {
    if (err.message && err.message.startsWith("No salesman with id")) {
      return res.status(404).json({ message: err.message });
    }
    const status = toStatusCode(err);
    res.status(status).json({ message: err.message });
  }
}

// PUT /salesmen/:id/performance-records
// Replaces ALL performanceRecords for a salesman with the array in the body
async function handleReplaceAllRecords(req, res, next) {
  try {
    const { id } = req.params;
    const records = req.body;

    // We expect req.body to be an array of performance records
    const updated = await updateSalesMan(id, { performanceRecords: records });
    res.json(updated.performanceRecords || []);
  } catch (err) {
    if (err.message && err.message.startsWith("No salesman with id")) {
      return res.status(404).json({ message: err.message });
    }
    const status = toStatusCode(err);
    res.status(status).json({ message: err.message });
  }
}

// DELETE /salesmen/:id/performance-records
async function handleDeleteAllRecords(req, res, next) {
  try {
    const { id } = req.params;
    const removedCount = await deleteSocialPerformanceRecords(id);
    res.json({ removedCount });
  } catch (err) {
    if (err.message && err.message.startsWith("No salesman with id")) {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
}

module.exports = {
  handleGetAllSalesmen,
  handleGetSalesmanById,
  handleCreateSalesman,
  handleUpdateSalesman,
  handleDeleteSalesman,
  handleGetRecordsById,
  handleGetRecordsByIdByYear,
  handleCreateRecord,
  handleReplaceAllRecords,
  handleDeleteAllRecords,
};
