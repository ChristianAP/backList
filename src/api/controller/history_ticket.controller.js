const express = require('express');
const { onlyTime, onlyDate } = require('../../lib/globals/date.global');
const router = express.Router();
const here = require('../model/history_ticket.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async(req, res) => {
    req.body.TCH_HOUR = await onlyTime();
    req.body.TCH_DATE = await onlyDate();
    req.body.TCH_STATUS = "1";
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