const express = require('express');
const { dateAndHour } = require('../../lib/globals/date.global');
const router = express.Router();

const here = require('../model/group.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get IND
router.get('/IND', async(req, res) => {
    here.IND(res);
});

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async(req, res) => {
    req.body.GRO_DATE_CREATE = await dateAndHour();
    req.body.GRO_STATUS = "1";
    here.create(req.body, res);
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