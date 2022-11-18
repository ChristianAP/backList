const express = require('express');
const router = express.Router();
const {
    dateForOperationsInDB,
} = require("../../lib/globals/date.global");
const here = require('../model/stock_details.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async (req, res) => {
    req.body.STD_DATECREATED = await dateForOperationsInDB();
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