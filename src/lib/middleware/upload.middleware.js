require('dotenv').config();
var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");

exports.uploadImage = async (req, res, next) => {
    if (req.files.IMAGE) {
        var data = new FormData();
        data.append("image", fs.createReadStream(req.files.IMAGE.path));

        var config = {
            method: "post",
            url: process.env.SERVER_IMAGES,
            headers: {
                ...data.getHeaders(),
            },
            data: data,
        };
        const datos = await axios(config);
        if (datos.data) {
            req.image = datos.data
            next()
        } else {
            res.send({ error: "error al subir archivos" });
        }
    } else {
        next()
    }
};

exports.uploadImageCompany = async (req, res, next) => {
    if (req.files.IMAGE) {
        var data = new FormData();
        data.append("image", fs.createReadStream(req.files.IMAGE.path), {filename: 'logo.jpg'});

        var config = {
            method: "post",
            url: process.env.SERVER_IMAGES,
            headers: {
                ...data.getHeaders(),
            },
            data: data,
        };
        const datos = await axios(config);
        if (datos.data) {
            req.image = datos.data
            next()
        } else {
            res.send({ error: "error al subir archivos" });
        }
    } else {
        next()
    }
};