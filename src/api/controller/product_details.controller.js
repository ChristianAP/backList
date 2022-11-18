const express = require('express');
const { dateAndHour } = require('../../lib/globals/date.global');
const router = express.Router();
const here = require('../model/product_details.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get all with product and Stock
router.get('/productstock/:query', async (req, res) => {
    const { query } = req.params;
    here.findProductDetailWithProductAndStock(res, query);
});

// Get all with Stock
router.get('/productstock', async (req, res) => {
    here.findProductDetailWithStock(res);

});

// Get one
router.get('/discount/:id/:cantidad', async (req, res) => {
    const { id, cantidad } = req.params;
    here.findProductWithDiscountById(res, id, cantidad);
});

router.get('/product_detail/:id/:cantidad', async (req, res) => {
    const { id, cantidad } = req.params;
    here.findProductDetail(res, id, cantidad);
});

// Get by list_price ID
router.get('/price_list/:param', async (req, res) => {
    const { param } = req.params;
    here.readByIDPL(res, param);
});

// Get by list_price Activo
router.get('/price_listactive', async (req, res) => {
    here.readPriceListActivo(res);
});

// Get by list_price Activo
router.get('/exportListPrice/:param', async (req, res) => {
    const { param } = req.params
    here.exportListPrice(res, param);
});

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async (req, res) => {
    req.body.PRD_STATUS = "1";
    req.body.PRD_CREATE_DATE = await dateAndHour();
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

module.exports = router;