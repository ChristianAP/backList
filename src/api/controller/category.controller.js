const express = require('express');
const router = express.Router();
const { uploadImage } = require('../../lib/middleware/upload.middleware');
const here = require('../model/category.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });
// Get Active Categories 
router.get('/tienda/active', async(req, res) => { here.readCategoriesActives(res); });
// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', uploadImage, async(req, res) => {
    req.body.CAT_STATUS = "1";
    req.body.CAT_IMAGE = req.image
    here.create(req.body, res);
});

// Edit
router.patch('/:param', uploadImage, async(req, res) => {
    const { param } = req.params;
    if (req.image) {
        req.body.CAT_IMAGE = req.image;
    } else {
        delete req.body.IMAGE;
    }
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;