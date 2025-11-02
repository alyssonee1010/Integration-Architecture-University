const salesmanModel = require('../models/salesman.model');


function handleGetAllSalesmen(req, res) {

    const salesmen = salesmanModel.getAllSalesmen();
    res.status(200).json(salesmen);
}


function handleGetSalesmanBySid(req, res) {

    const sid = parseInt(req.params.sid, 10);

    const salesman = salesmanModel.getSalesmanBySid(sid);

    if (salesman) {
        res.status(200).json(salesman);
    } else {
        res.status(404).json({
            error: "Salesman not found",
            sid: req.params.sid
        });
    }
}

function handleGetRecordsBySid(req, res){


}

module.exports = {
    handleGetAllSalesmen,
    handleGetSalesmanBySid,
};