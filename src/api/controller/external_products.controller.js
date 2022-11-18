const express = require('express');
// const { uploadImage } = require('../../lib/middleware/upload.middleware');
const router = express.Router();
const here = require('../model/external_products.model');

// Get all
router.get('/', async (req, res) => { here.getExtermalProducts(res); });

// Get all
router.get('/alerts/', async (req, res) => { 
    here.getAlerts(res);
});

// Get all
router.get('/product_type/', async (req, res) => { 
    here.getProductType(res);
});
// Get all
router.get('/paymenthmetod/', async (req, res) => { 
    here.getPaymenthMethod(res);
});
// Create new
router.post('/', async (req, res) => {
    here.create(req.body, res);
});

// Edit
router.patch('/stateCompra/:param', async (req, res) => {
    const { param } = req.params;
    here.editStateCompra(res, req.body);
});

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

// Edit
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});



module.exports = router;