const express = require('express');
const router = express.Router();
const here = require('../model/voucher.model');

// Get voucher
router.post('/', async(req, res) => {
    here.readByOne(res, req.body);
});

module.exports = router;