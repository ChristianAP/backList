const express = require('express');
const router = express.Router();
const here = require('../model/document_type.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get all
router.get('/remision', async (req, res) => { here.readGuiaRemissionID(res); });

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});
// Get D_T by Type of document
router.get('/notacredito/:param', async (req, res) => {
    const { param } = req.params;
    here.readNotaCredito(res, param);
});

// Create new
router.post('/', async (req, res) => {
    req.body.DCT_STATUS = "1";
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