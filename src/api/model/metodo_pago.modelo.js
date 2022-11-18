const global = require('../../lib/globals/model.global');
const { metodo_pago } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.editState = async(res, req) => {
    await pool.query(
        "UPDATE sv_metodo_pago SET MPG_STATUS = ? WHERE MPG_ID = ?", [req.MPG_STATUS, req.MPG_ID],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "ESTADO DE METODO DE PAGO ACTUALIZADO CORRECTAMENTE",
                        status: 200,
                    });
                } else {
                    res.status(500).json({
                        message: err,
                        status: 500,
                    });
                }
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
}

exports.create = async(req, res) => global.create(res, metodo_pago.name, metodo_pago.name_table, req);
exports.read = async(res) => global.read(res, metodo_pago.name, metodo_pago.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, metodo_pago.name, metodo_pago.name_table, 'MPG_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, metodo_pago.name, metodo_pago.name_table, res_column, 'MPG_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, metodo_pago.name, metodo_pago.name_table, 'MPG_ID', res_update);