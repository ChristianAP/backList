const express = require('express');
const router = express.Router();
const here = require('./whatsapp.model');

// Get all
router.get('/send/message/:param', async(req, res) => {
    const { param } = req.params;
    here.sendMessage(res, param);
});

module.exports = router;