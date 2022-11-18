const express = require('express');
const { dateForOperationsInDB } = require('../../lib/globals/date.global');
const router = express.Router();
const here = require('../model/sales_description.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});
/* 
// READ BY SALES
router.get('/bysale/:param', async(req, res) => {
    const { param } = req.params;
    here.readBySales(res, param);
}); 
 */
// READ BY SALES
router.get('/bysale/:param/:type', async(req, res) => {
    const { param, type } = req.params;
    here.readBySales(res, param, type);
});

router.get('/bybuy/:param', async(req, res) => {
    const { param } = req.params;
    here.readByBuy(param, res);
});

// Create new
router.post('/', async(req, res) => {
    req.body.SDS_STATUS = "1";
    req.body.SDT_DATE = await dateForOperationsInDB();
    here.create(req.body, res);
});

//Create By Array 
router.post('/byarray/', async(req, res) => {
    var data = req.body;
    var changeArray = data.map(doc => Object.values(doc));
    here.createByArray(changeArray, res);
});
// Edit
router.patch('/:param', async(req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;