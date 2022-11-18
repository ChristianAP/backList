const express = require('express');
const { uploadImage } = require('../../lib/middleware/upload.middleware');
const router = express.Router();
const here = require('../model/promotion.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', uploadImage, async (req, res) => {
    if (req.image) {
        req.body.PRT_IMAGE = req.image;
    } else {
        delete req.body.IMAGE;
    }
    here.create(req.body, res);
});

// Edit
router.patch('/:param', uploadImage, async (req, res) => {
    if (req.image) {
        req.body.PRT_IMAGE = req.image;
    } else {
        delete req.body.IMAGE;
    }
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;