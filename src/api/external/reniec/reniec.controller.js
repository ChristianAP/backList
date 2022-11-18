const express = require('express');
const router = express.Router();
const here = require('./reniec.model');

// Get all
router.get('/dni/:param', async(req, res) => {
    const { param } = req.params;
    here.readDNI(res, param);
});

module.exports = router;