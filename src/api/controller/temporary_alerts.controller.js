const express = require('express');
const router = express.Router();
const here = require('../model/temporary_alerts.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get History
router.get('/history/', async(req, res) => { here.read_history(res); });

// Create new
router.post('/', async(req, res) => {
    here.create(req.body, res);
});

// Edit
router.patch('/:param', async(req, res) => {
    const { param } = req.params;
    here.updateStatus(res, param);
});


module.exports = router;