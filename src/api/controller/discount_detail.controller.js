const express = require('express');
const router = express.Router();
const here = require('../model/discount_detail.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

//Get by Discount Id DiscountDetailByDiscountId
router.get('/product/:param', async (req, res) => {
    const { param } = req.params;
    here.DiscountDetailByDiscountId(param, res);
});

router.get('/searchcat/:idcat/:online', async (req, res) => {
    const { idcat, online } = req.params;
    here.searchProductWhitCategory(idcat, online, res);
});

router.get('/searchpro/:nameprod/:online', async (req, res) => {
    const { nameprod, online } = req.params;
    here.searchProductWhitName(nameprod, online, res);
});

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Update dicount
router.get('/desableddiscount/:param', async (req, res) => {
    const { param } = req.params;
    here.DesabledDiscountByProductId(res, param);
});

// Create new 
router.post('/', async (req, res) => {
    req.body.DIS_STATUS = "1";
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