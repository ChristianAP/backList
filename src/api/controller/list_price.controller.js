const express = require('express');
const router = express.Router();
const { dateAndHour } = require('../../lib/globals/date.global');
const here = require('../model/list_price.model');

//ProductsWithOutPriceListActive
router.get('/productoutactivelist', async (req, res) => {
    here.ProductsWithOutPriceListActive(res);
});

//list client
router.get('/listClient', async (req, res) => {
    here.getListClient(res);
});

// Get all
router.get('/:param', async (req, res) => {
    const { param } = req.params
    here.read(res, param);
});

//get SeletProducsWithoutPriceList
router.get('/productout/:param', async (req, res) => {
    const { param } = req.params;
    here.SeletProducsWithoutPriceList(param, res);
});


// Create new
router.post('/:param', async (req, res) => {
    const { param } = req.params

    req.body.PRL_CREATED = await dateAndHour();
    req.body.PRL_STATUS = '1'
    req.body.LCT_ID = param
    here.create(req.body, res);
});

// Create new
router.patch('/desabled/:param', async (req, res) => {
    const { param } = req.params
    here.DesabledPriceList(res, param);
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