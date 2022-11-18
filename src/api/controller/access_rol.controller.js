const express = require('express');
const router = express.Router();
const here = require('../model/access_rol.model');

// Get all
router.get('/', async(req, res) => { here.getAllRolAccess(res); });

// Get one
router.get('/:param', async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/add', async(req, res) => {
    req.body.ARO_STATUS = "1";
    here.create(req.body, res);
});

// Edit
router.patch('/update/:param', async(req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/delete/:param', async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;