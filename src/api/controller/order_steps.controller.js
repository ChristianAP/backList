const express = require('express');
const router = express.Router();
const here = require('../model/order_steps.model');

// Get all Activated
router.get('/activated/', async (req, res) => { here.readSteps(res); });

// Get All
router.get('/', async (req, res) => { here.readStepsAll(res); });

// Get PRODUCT DESCRIPTIONS
router.get('/productsDescritions/', async (req, res) => { here.readStateDescriptionProducts(res); });

// Edit STATE PRODUCTS DESCRIPTIONS
router.patch('/stateProductDescriptions/', async (req, res) => {
    here.updateStateProductDescription(res, req.body);
});

// Edit Order Steps
router.get('/validatedStep/:param', async (req, res) => {
    const { param } = req.params;
    here.validateDesactiveStep(res, param);
});

// Edit Order Steps
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    here.updateStep(res, req.body, param);
});

// Edit Status Order Steps
router.patch('/status/:param', async (req, res) => {
    const { param } = req.params;
    here.updateStepStatus(res, req.body);
});

module.exports = router;
