const express = require('express');
const router = express.Router();
const here = require('../model/user_rol.model');

// Get all
router.get('/', async(req, res) => { here.read(res); });

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async(req, res) => {
    req.body.URO_STATUS = "1";
    const person = req.body.PER_ID;
    const tam = req.body.roles.length;
    here.create(req.body, res, tam, person);
});

// Create count of client
router.post('/count/client', async(req, res) => {
    here.countClient(req.body, res);
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