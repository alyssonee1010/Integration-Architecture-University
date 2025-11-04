const salesmanModel = require("../models/salesman.model");

function handleGetAllSalesmen(_req, res) {
  const salesmen = salesmanModel.getAllSalesmen();
  res.status(200).json(salesmen);
}

function handleGetSalesmanById(req, res) {
  const id = String(req.params.id);
  const salesman = salesmanModel.getSalesmanById(id);
  if (!salesman) {
    return res.status(404).json({ error: "Salesman not found", id });
  }
  res.status(200).json(salesman);
}

function handleCreateSalesman(req, res) {
  try {
    const created = salesmanModel.createSalesMan({
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
    });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

function handleUpdateSalesman(req, res) {
  const id = String(req.params.id);
  try {
    const updated = salesmanModel.updateSalesMan(id, req.body || {});
    res.status(200).json(updated);
  } catch (e) {
    const code = /No salesman/.test(e.message) ? 404 : 400;
    res.status(code).json({ error: e.message });
  }
}

function handleDeleteSalesman(req, res) {
  const id = String(req.params.id);
  const ok = salesmanModel.deleteSalesMan(id);
  if (!ok) return res.status(404).json({ error: "Salesman not found", id });
  res.status(204).end();
}

function handleGetRecordsById(req, res) {
  const id = String(req.params.id);
  const list = salesmanModel.getSocialPerformanceRecordBySalesmen(id);
  if (list === null) return res.status(404).json({ error: "Salesman not found", id });
  res.status(200).json(list);
}
function handleGetRecordsByIdByYear(req, res) {
  const id = String(req.params.id);
  const record = salesmanModel.getSocialPerformanceRecordBySalesmenByYear(id, req.params.year);
  if (record === null) return res.status(404).json({ error: "Salesman not found", id });
  res.status(200).json(record);
}

function handleCreateRecord(req, res) {
  const id = String(req.params.id);
  try {
    const rec = salesmanModel.createSocialPerformanceRecord(id, req.body || {});
    res.status(201).json(rec);
  } catch (e) {
    const code = /No salesman/.test(e.message) ? 404 : 400;
    res.status(code).json({ error: e.message });
  }
}

function handleReplaceAllRecords(req, res) {
  const id = String(req.params.id);
  try {
    const patch = { performanceRecords: req.body || [] };
    const updated = salesmanModel.updateSalesMan(id, patch);
    res.status(200).json(updated.performanceRecords);
  } catch (e) {
    const code = /No salesman/.test(e.message) ? 404 : 400;
    res.status(code).json({ error: e.message });
  }
}

function handleDeleteAllRecords(req, res) {
  const id = String(req.params.id);
  try {
    const cleared = salesmanModel.deleteSocialPerformanceRecords(id);
    res.status(200).json({ cleared });
  } catch (e) {
    res.status(404).json({ error: e.message });
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
