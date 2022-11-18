const express = require('express');
const { uploadImage } = require('../../lib/middleware/upload.middleware');
const router = express.Router();
const here = require('../model/metodo_pago.modelo');

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
        req.body.MPG_IMAGE = req.image;
    } else {
        delete req.body.IMAGE;
    }
    if (req.image && req.image.code == "LIMIT_FILE_SIZE") {
        res.status(300).json({
            message: "limite excediste el limite de la imagen",
            status: 500,
        })
    } else {
        here.create(req.body, res);
    }
});

// Edit
router.patch('/:param', uploadImage, async (req, res) => {
    if (req.image) {
        req.body.MPG_IMAGE = req.image;
    } else {
        delete req.body.IMAGE;
    }
    const { param } = req.params;
    if (req.image && req.image.code == "LIMIT_FILE_SIZE") {
        res.status(300).json({
            message: "limite excediste el limite de la imagen",
            status: 500,
        })
    } else {
        here.updateOne(res, req.body, param);
    }
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

// Edit
router.patch('/statePago/:param', async (req, res) => {
    const { param } = req.params;
    here.editState(res, req.body);
});

module.exports = router;