const express = require('express');
const router = express.Router();
const here = require('../model/config.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

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
    here.updateOne(res, param, req.body);
});

//Update TEMPLATE_ID in sv_cofig
router.patch('/template/:param', async(req, res) => {
    const { param } = req.params;
    here.updateConfigTemplate(param, res);
});

// Delete
router.delete('/:param', async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;