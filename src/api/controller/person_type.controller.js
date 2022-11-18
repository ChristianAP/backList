const express = require('express');
const router = express.Router();
const here = require('../model/person_type.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get IND
router.get('/IND', async(req, res) => {
    here.IND(res);
});

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async(req, res) => {
    here.create(req.body, res);
});

// Edit
router.patch('/:param', async(req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;