const express = require('express');
const router = express.Router();
const { onlyDate } = require("../../lib/globals/date.global");
const here = require('../model/document.model');

router.get('/buys', async (req, res) => {
    here.getbuys(res);
});

// Get all
router.get('/', async (req, res) => { here.read(res); });

//Get Document Desc
router.get('/desc/:fechaIni/:fechaFin/:tienda', async (req, res) => {
    const { fechaIni, fechaFin, tienda } = req.params
    const inicio = fechaIni.split("-")
    const fin = fechaFin.split("-")
    const fechaInicio = inicio[2] + "-" + inicio[1] + "-" + inicio[0]
    const fechaFincio = fin[2] + "-" + fin[1] + "-" + fin[0]
    here.readAllDesc(res, fechaInicio, fechaFincio, tienda);
});

//Get Document Desc
router.get('/descDetail/:fechaIni/:fechaFin/:tienda', async (req, res) => {
    const { fechaIni, fechaFin, tienda } = req.params
    const inicio = fechaIni.split("-")
    const fin = fechaFin.split("-")
    const fechaInicio = inicio[2] + "-" + inicio[1] + "-" + inicio[0]
    const fechaFincio = fin[2] + "-" + fin[1] + "-" + fin[0]
    here.readAllDescDetail(res, fechaInicio, fechaFincio, tienda);
});

//Get Document For Consilation Desc
router.get('/consilation/:fechaIni/:fechaFin', async (req, res) => {
    const { fechaIni, fechaFin } = req.params
    const inicio = fechaIni.split("-")
    const fin = fechaFin.split("-")
    const fechaInicio = inicio[2] + "-" + inicio[1] + "-" + inicio[0]
    const fechaFincio = fin[2] + "-" + fin[1] + "-" + fin[0]
    here.readConsilaionDoc(res, fechaInicio, fechaFincio);
});
//Get Document Desc
router.get('/desconlycomp', async (req, res) => {

    here.readAllDescOnlyComp(res);
});
//get business 
router.get('/business', async (req, res) => {

    here.getBusiness(res);
});
// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});



// Create new
router.post('/', async (req, res) => {
    req.body.DOC_STATUS = "1";
    here.create(req.body, res);
});

// Create new from add product
router.post("/fromaddproduct/", async (req, res) => {
    here.createfromaddproduct(req.body, res);
});

// Create Document with salesproduction
router.post('/create', async (req, res) => {
    here.createSale(req.body, res);
});

// Create Document for buys
router.post('/createbuy', async (req, res) => {
    here.crearBuyDoc(req.body, res);
});

// Edit
router.patch('/updateDocumentSequence/:sequence/:idDocument', async (req, res) => {
    const { sequence, idDocument } = req.params;
    here.updateDocument(sequence, idDocument, res);
});

// Edit
router.patch('/:param', async (req, res) => {
    const { param } = req.params;
    if (req.body.DOC_ESTADO == 0) {
        req.body.DOC_ESTADO = 1
    }
    here.updateOne(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;