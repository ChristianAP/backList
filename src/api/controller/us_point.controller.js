const express = require('express');
const router = express.Router();
const here = require('../model/us_point.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get with POS_ID
router.get('/VentaByPOS/:param', async (req, res) => {
    const { param } = req.params;
    here.readVentaByPOS(res, param);
});

// Get with POS_ID
router.get('/readPOSByUserId/:param', async (req, res) => {
    const { param } = req.params;
    here.readPOSByUserId(res, param);
});

// PUNTO DE VENTA SELECT
router.get('/selectPointSale/:param', async (req, res) => {
    const { param } = req.params;
    here.readPuntosUsuariosSelect(res, param);
});

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
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

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

// Delete
router.delete('/deleteUserId/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteByUsrId(res, param);
});

module.exports = router;