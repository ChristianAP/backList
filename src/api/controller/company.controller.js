const express = require('express');
const { uploadImageCompany } = require('../../lib/middleware/upload.middleware');
const router = express.Router();
const here = require('../model/company.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/uploadIcon', uploadImageCompany, async (req, res) => {
    res.status(200).json({
        message: "Logo Modificado con Exito",
        status: 200,
        url: req.image
    });
});

// Create new
router.post('/', async (req, res) => {
    req.body.TDK_STATUS = "1";
    here.create(req.body, res);
});

// Edit
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;