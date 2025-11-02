const express = require('express');

const salesmanController = require('../controllers/salesman.controller');

const router = express.Router();




router.get('/', salesmanController.handleGetAllSalesmen);

router.get('/:sid', salesmanController.handleGetSalesmanBySid);

router.get('/:sid/record', salesmanController.handdleGetRecordsBySid);

router.get('/:sid/record/:year', salesmanController.handdleGetRecordsBySidYear);



module.exports = router;