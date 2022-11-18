const express = require('express');
const { dateAndHourForOperationsInDB } = require('../../lib/globals/date.global');
const router = express.Router();
const here = require('../model/sales.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get all ventas online 
router.get('/salesonline/:fechaIni/:fechaFin', async (req, res) => {
    const { fechaIni, fechaFin } = req.params;
    here.readsalesonline(res, fechaIni, fechaFin);
});

// Get all productos de ventas online 
router.get('/productssalesonline/:param', async (req, res) => {
    const { param } = req.params;
    here.readproductssalesonline(res, param)
});
// get venta con datos del cliente 

router.get('/saleswithclient/:param', async (req, res) => {
    const { param } = req.params;
    here.readsaleswithclient(res, param)
});

// Verify voucher of sale online
router.patch('/verifyvoucher/:param', async (req, res) => {
    const { param } = req.params;
    req.body.ORD_APPROVAL_DATE = await dateAndHourForOperationsInDB();
    here.verifyvoucher(res, param, req.body);
});


// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async (req, res) => {
    req.body.SAL_STATUS = "1";
    here.create(req.body, res);

});

// Edit
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

// patch COMPLETE
router.patch('/deleteDocument/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteDocument(res, param);
});

module.exports = router;