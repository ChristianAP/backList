const express = require('express');
const router = express.Router();
const { login, loginWithDni,CreateCode, ValidateCode } = require('../model/login.model');
const { verifyToken } = require('../../lib/middleware/verify.middleware');
const jwt = require('jsonwebtoken');
const { create } = require('lodash');

router.post('/singin', async(req, res) => {
    const { user, password } = req.body;
    await login(user, password, res);
});

router.get('/getToken', async(req, res) => {
    const token = req.headers.authorization.substr(7);
    const content = jwt.verify(token, process.env.TOKEN_KEY);
    req.data = content;
    await loginWithDni(content.USR_ID, res);
});

router.post('/test', verifyToken, (req, res) => {
    res.json(req.data);
});
router.post('/createCode', (req, res) => {
    console.log(req.body)
    const {correo,usuario}=req.body
    CreateCode(res,correo, usuario)
    
});
router.post('/validateCode', (req, res) => {
    console.log(req.body)
    const {usuario,correo,codigo}=req.body
    ValidateCode(res,usuario,correo,codigo)
    
});


module.exports = router;