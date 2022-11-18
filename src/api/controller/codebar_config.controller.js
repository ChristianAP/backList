const express = require('express');
const router = express.Router();
const here = require('../model/codebar_config.model');

// Get all
router.get('/', async (req, res) => { here.listCodebars(res); });

// // Get one
// router.get('/:param', async (req, res) => {
//     const { param } = req.params;
//     here.readByOne(res, param);
// });

// // Create new
// router.post('/', async (req, res) => {
//     here.create(req.body, res);
// });
// Edit CODEBAR
router.patch('/otherCodebars/:param', async (req, res) => {
    const { param } = req.params;
    here.updateIDSOtherCodebars(res, req.body);
});

// Edit CODEBAR
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    here.updateConfCodebar(res, req.body);
});

// // Delete
// router.delete('/:param', async (req, res) => {
//     const { param } = req.params;
//     here.deleteOne(res, param);
// });

module.exports = router;