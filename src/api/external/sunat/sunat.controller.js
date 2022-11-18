const express = require('express');
const router = express.Router();
const here = require('./sunat.model');

// Get all
router.get('/ruc/:param', async(req, res) => {
    const { param } = req.params;
    here.readRUC(res, param);
});

module.exports = router;