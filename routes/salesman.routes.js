const express = require("express");
const salesmanController = require("../controllers/salesman.controller");

const router = express.Router();

// Salesmen
router.get("/", salesmanController.handleGetAllSalesmen);
router.get("/:id", salesmanController.handleGetSalesmanById);
router.post("/", salesmanController.handleCreateSalesman);
router.put("/:id", salesmanController.handleUpdateSalesman);
router.delete("/:id", salesmanController.handleDeleteSalesman);

// Performance records (per salesman)
router.get("/:id/performance-records", salesmanController.handleGetRecordsById);
router.get("/:id/performance-records/:year", salesmanController.handleGetRecordsByIdByYear);
router.post("/:id/performance-records", salesmanController.handleCreateRecord);
router.put("/:id/performance-records", salesmanController.handleReplaceAllRecords);
router.delete("/:id/performance-records", salesmanController.handleDeleteAllRecords);

module.exports = router;
