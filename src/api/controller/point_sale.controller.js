const express = require('express');
const router = express.Router();
const here = require('../model/point_sale.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get with POS_ID
router.get('/VentaByPOS/:param', async (req, res) => {
    const { param } = req.params;
    here.readVentaByPOS(res, param);
});


// Get export Remissions - MODAL
router.get('/expRem/ult/:param', async (req, res) => {
    const { param } = req.params;
    here.getUltimos(res, param);
});

// Get export Remissions - excel
router.get('/expRem/:param/:fecIni/:fecFin', async (req, res) => {
    const { param, fecIni, fecFin } = req.params;
    const inicial = fecIni.split('-')
    const fechaInicial = inicial[2] + '-' + inicial[1] + '-' + inicial[0]
    const fin = fecFin.split('-')
    const fechaFinal = fin[2] + '-' + fin[1] + '-' + fin[0]
    console.log('FECHA INI ...' , fechaInicial);
    console.log('FECHA FIN ...' , fechaFinal);
    // here.readRemissionsID(res, param, fechaInicial, fechaFinal);
    here.readRemissionsID(res, param, '2022-01-01', fechaFinal);
});
// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async (req, res) => {
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
