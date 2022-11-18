const express = require('express');
const router = express.Router();
const here = require('../model/kardex.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get one readByOneproductId
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOneproductId(res, param);
});


module.exports = router;