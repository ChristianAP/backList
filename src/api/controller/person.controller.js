const express = require('express');
const router = express.Router();
const here = require('../model/person.model');
const { verifyToken } = require('../../lib/middleware/verify.middleware');

// Get all
router.get('/', async (req, res) => { here.read(res); });

// Get person for Documento de Identificacion
router.get('/identidad/:identifiacion', async (req, res) => {
    const { identifiacion } = req.params
    here.readforDNI(res, identifiacion);
});

// Get person for ticket
router.get('/fortickets', async (req, res) => {
    here.readforticket(res);
});
//// Get conductores
router.get('/conductor', async (req, res) => {
    here.readConductor(res);
});
// Get person for create document
router.get('/fordocument/:param', async (req, res) => {
    const { param } = req.params;
    here.readPersonByDocument(res, param);
});

// Get one
router.get('/:param', async (req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Get one
router.get('/user/:param', async (req, res) => {
    const { param } = req.params;
    here.readUserByOne(res, param);
});

// Agregar Rol Conductor
router.get('/RolCondu/:param', async (req, res) => {
    const { param } = req.params;
    here.createRolConductor(res, param);
});

// Update Placa y Licencia
router.patch('/PlaLice/', async (req, res) => {
    here.updateConductor(res, req.body);
});

// Delete Conductor
router.patch('/DeleteCond/', async (req, res) => {
    here.deleteRolConductor(res, req.body);
});


// Find By DNI 
router.get('/findbydni/:dni', async (req, res) => {
    const { dni } = req.params;
    here.findByDni(res, dni);
});

router.get('/findbyruc/:ruc', async (req, res) => {
    const { ruc } = req.params;
    here.findByRuc(res, ruc);
});

//  Search by name
router.get('/findbyname/:name', async (req, res) => {
    const { name } = req.params;
    here.searchPerson(res, name);
});

// Get one PARA LA TIENDA
router.get('/tienda/online', verifyToken, async (req, res) => {
    here.readByOne(res, req.data.PER_ID);
});

// Create new
router.post('/', async (req, res) => {
    const client = req.body.CLIENT;
    delete req.body.CLIENT;
    req.body.PER_STATUS = "1";
    here.create(req.body, client, res);
});

router.post('/create', async (req, res) => {
    req.body.PER_STATUS = "1";
    //delete req.body.GRO_ID;
    //delete req.body.CLA_ID;
    here.createPerson(res, req.body);
});

// Edit
router.patch('/edit/:param', async (req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Edit
router.patch('/tienda/edit', verifyToken, async (req, res) => {
    here.updateOneTienda(res, req.data.PER_ID, req.body);
});

// Edit Person
router.patch('/adduser/:param', async (req, res) => {
    const { param } = req.params;
    here.updateOneForUSer(res, req.body, param);
});

// Delete
router.delete('/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

// Delete PROVEEDOR
router.patch('/deleteProveedor/:param', async (req, res) => {
    const { param } = req.params;
    here.deleteProveedor(res, param);
});


module.exports = router;