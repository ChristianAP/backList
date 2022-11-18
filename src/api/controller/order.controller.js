require('dotenv').config();
const express = require('express');
const router = express.Router();
const here = require('../model/orders.model');
const { verifyToken } = require('../../lib/middleware/verify.middleware');
const { uploadImage } = require('../../lib/middleware/upload.middleware');

// Get all
router.get('/', async (req, res) => { here.read(res); });
router.get('/export/:fechaIni/:fechaFin', async (req, res) => {
    const { fechaIni, fechaFin } = req.params;
    here.exportOrders(res, fechaIni, fechaFin);
});

// Get by Id client
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    //res.json({ asd: "hola" });
    here.readByCLientId(res, param);
});
// Get by Id client
router.get('/tienda/online', verifyToken, async (req, res) => {
    //res.json({ asd: "hola" });
    here.readByCLientId(res, req.data.CLI_ID);
});
// Get by Id
router.get('/orderid/:param', async (req, res) => {
    const { param } = req.params;
    //res.json({ asd: "hola" });
    here.readByOrderId(res, param);
});

// Get Detail Order By Id Order
router.get('/detail/:idorder', async (req, res) => {
    const { idorder } = req.params;
    //res.json({ asd: "hola" });
    here.readOrderDetailByOrderID(res, idorder);
});

// Create new
router.post('/', verifyToken, async (req, res) => {
    req.body.order.CLI_ID = req.data.CLI_ID
    req.body.order.ORD_STATUS = "1";
    req.body.order.ORD_APPROVAL = "0";
    req.body.order.ORD_APPROVAL_USER = "1";
    req.body.order.ORD_DISPATCHED = "0";
    here.create(req.body, res);
});

// Edit
router.patch('/changeStatusOrder', async (req, res) => {
    here.changeStatusOrder(res, req.body);
});

// Edit
router.patch('/validationAlert', async (req, res) => {
    here.validationAlert(res, req.body);
});

// Edit
router.patch('/closeAlert', async (req, res) => {
    here.closeAlert(res, req.body);
});

// Edit
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Edit
router.patch('/changestatus/:idorder', async (req, res) => {
    const { idorder } = req.params;
    here.ChangeStatus(res, req.body.ORD_STATUS, idorder);
});

// Edit
router.patch('/tienda/:param', uploadImage, async (req, res) => {
    const { param } = req.params;
    req.body.ORD_VOUCHER = req.image;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;