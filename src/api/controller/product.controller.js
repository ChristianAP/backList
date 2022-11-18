const express = require('express');
const router = express.Router();
const { uploadImage } = require('../../lib/middleware/upload.middleware');
const { dateAndHour } = require('../../lib/globals/date.global');
const here = require('../model/product.model');

// Get UNIT MEAN
router.get('/unitMean/', async (req, res) => {
    here.getUnitMean(res);
});

// Get detained alerts
router.get('/warehouse/', async (req, res) => {
    here.warehouse(res);
});

// Get detained alerts
router.get('/tenProduct/', async (req, res) => {
    here.getTenProductOnline(res);
});

// Get detained alerts
router.get('/code/:codebar', async (req, res) => {
    const { codebar } = req.params
    here.getProductByCodeBar(res, codebar);
});

// Get all
router.get('/withCatAndTrade/:online', async (req, res) => {
    const { online } = req.params
    here.getWithCatAndTrade(res, online);
});

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get by search
router.get('/search/:buscador', async (req, res) => {
    const { buscador } = req.params;
    here.findBySearch(res, buscador);
});

// Get by search
router.get('/father/:father_id', async (req, res) => {
    const { father_id } = req.params;
    here.getProductChildrensByFather(res, father_id);
});

// Get by category
router.get('/category/:buscador', async (req, res) => {
    const { buscador } = req.params;
    here.findByCategory(res, buscador);
});
// Get by category
router.get('/categoryById/:buscador', async (req, res) => {
    const { buscador } = req.params;
    here.findByCategoryId(res, buscador);
});

// Get product with discount
router.get('/discount', async (req, res) => {
    here.findProductWithDiscount(res);
});

// Get product with discount
router.get('/remission/:param/:catid/:lct', async (req, res) => {
    const { param, catid, lct } = req.params;
    here.findRemissionsProducts(res, param, catid, lct);
});

// // Get product with discount and name
// router.get('/discount_name/:name', async(req, res) => {
//     const { name } = req.params
//     here.findProductWithDiscountAndName(name, res);
// });

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});


// Create new
router.post('/', uploadImage, async (req, res) => {
    req.body.PRO_CREATE_DATE = await dateAndHour();
    if (req.image) {
        req.body.PRO_IMAGE = req.image;
    } else {
        delete req.body.IMAGE;
    }
    req.body.PRO_STATUS = "1";
    here.create(req.body, res);
});

// Edit
router.patch('/:param', uploadImage, async (req, res) => {
    if (req.image) {
        req.body.PRO_IMAGE = req.image;
    } else {
        delete req.body.IMAGE;
    }
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;
