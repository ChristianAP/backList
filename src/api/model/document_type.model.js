const global = require('../../lib/globals/model.global');
const pool = require('../../connection/connection');
const { document_type } = require('../../lib/secret/key.secret');
exports.readNotaCredito = async (res,req) => await pool.query(
    "CALL PR_TIPONOTACREDITO(?)", [req],(err, result) => {
        if (result.length == 0) {
            res.json({
                message: "No se encuentran registros",
                status: 200
            });
        } else if (err == null) {
            res.status(200).send(result[0][0]);
        } else {
            res.json({
                message: err,
                status: err
            });
        }
    }
);
exports.readGuiaRemissionID = async (res,req) => await pool.query(
    "SELECT * FROM sv_document_type dt WHERE dt.DCT_NAME LIKE '%GUIA DE REMISION%'", [req],(err, result) => {
        if (result.length == 0) {
            res.json({
                message: "No se encuentran registros",
                status: 200
            });
        } else if (err == null) {
            res.status(200).send(result[0]);
        } else {
            res.json({
                message: err,
                status: err
            });
        }
    }
);
exports.create = async(req, res) => global.create(res, document_type.name, document_type.name_table, req);
exports.read = async(res) => global.read(res, document_type.name, document_type.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, document_type.name, document_type.name_table, 'DCT_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, document_type.name, document_type.name_table, res_column, 'DCT_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, document_type.name, document_type.name_table, 'DCT_ID', res_update);
