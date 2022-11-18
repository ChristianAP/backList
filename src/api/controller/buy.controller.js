const express = require('express');
const router = express.Router();
const here = require('../model/buy.model');

//getProductStock
router.get('/productstock', async(req, res) => { here.getProductStock(res); });

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async(req, res) => {
    here.create(req.body, res);

});
// testing now
router.get('/test', async(req, res) => {
    here.test(req.body, res);
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