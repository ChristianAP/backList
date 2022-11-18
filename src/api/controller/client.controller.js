const express = require('express');
const { dateAndHour } = require('../../lib/globals/date.global');
const router = express.Router();
const here = require('../model/client.model');
const { verifyToken } = require('../../lib/middleware/verify.middleware');

// Create new
router.post('/', async(req, res) => {
    req.body.CLI_DATE_CREATE = await dateAndHour();
    req.body.CLI_STATUS = "1";
    here.create(req.body, res);
});

// Get all
router.get('/', async(req, res) => { here.readClient(res); });

// Get all workers
router.get('/worker/', async(req, res) => { here.readWorker(res); });

// Get one
router.get('/oneclient/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Edit
router.patch('/edit/:param', async(req, res) => {
    const { param } = req.params;
    here.updateOne(res, param, req.body);
});

// Delete
router.delete('/:param', async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

// Get one and detail
router.get('/detail', verifyToken, async(req, res) => {
    here.readClientDetail(res, req.data.PER_ID);
});


module.exports = router;