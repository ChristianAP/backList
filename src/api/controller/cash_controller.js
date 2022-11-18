const express = require('express');
const router = express.Router();
const here = require('../model/cash.model');



// Get all
router.get('/', async (req, res) => { here.readCashRegister(res); });

// Get one
router.get('/CashByUser/:param', async (req, res) => {
    const { param } = req.params;
    here.readCashRegisterByUserID(res, param);
});

// Get one
router.get('/UltimoByUserID/:param', async (req, res) => {
    const { param } = req.params;
    here.getUltimoRegistroCajaPorID(res, param);
});

// Get sale of cash
router.patch('/SaleForCash/:param', async (req, res) => {
    const { param } = req.params;
    // console.log(req.body);
    here.getsalesForCash(res, req.body);
});

// Create new
router.post('/', async (req, res) => {
    here.create(req.body, res);
});

// Edit
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// // Delete
// router.delete('/:param', async (req, res) => {
//     const { param } = req.params;
//     here.deleteOne(res, param);
// });

module.exports = router;