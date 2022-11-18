const express = require('express');
const router = express.Router();
const here = require('../model/message.model');
const { onlyDate, onlyTime } = require("../../lib/globals/date.global");


// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get by Ticket
router.get('/getbyticket/:param', async(req, res) => {
    const { param } = req.params;
    here.readByTicket(res, param);
});

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async(req, res) => {
    req.body.MSS_STATUS = "1";
    req.body.MSS_DATE = await onlyDate();
    req.body.MSS_TIME = await onlyTime();
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