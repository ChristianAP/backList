const express = require('express');
const router = express.Router();
const { onlyDate } = require("../../lib/globals/date.global");
const here = require('../model/remission.model');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get one
router.get('/export/:param', async (req, res) => {
    const { param } = req.params;
    here.exportRemision(res, param);
});
// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post('/', async (req, res) => {
    delete req.body.PRO_NAME
    here.create(req.body, res);
});

// Edit
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    let date = await onlyDate()
    let formFecha = date.split('-')
    let fecNew = formFecha[2] + '-' + (formFecha[1] < 10 ? '0'+ formFecha[1] : formFecha[1]) + '-' + (formFecha[0] < 10 ? '0'+ formFecha[0] : formFecha[0]) 
    if (req.body.REM_OUT == 0) {
        req.body.REM_OUT = 1;
        req.body.REM_UPDATEOUT = fecNew
    }
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

// Get remission fechas
router.get('/remFechas/:fecIni/:fecFin', async (req, res) => {
    const { fecIni, fecFin } = req.params
    const inicio = fecIni.split("-")
    const fin = fecFin.split("-")
    const fechaInicio = inicio[2] + "-" + inicio[1] + "-" + inicio[0]
    const fechaFincio = fin[2]+ "-" + fin[1] + "-" + fin[0]
    here.readFechaRemi(res, fechaInicio, fechaFincio);
});

module.exports = router;
