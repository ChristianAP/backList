const express = require('express');
const router = express.Router();
const { dateAndHour } = require('../../lib/globals/date.global');
const here = require('../model/provider.model');

// Get all
router.get('/', async(req, res) => { here.getProvider(res); });

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async(req, res) => {
    req.body.CLI_DATE_CREATE = await dateAndHour();
    req.body.CLI_STATUS = "1";
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