const global = require('../../lib/globals/model.global');
const pool = require("../../connection/connection");
const { remission_details } = require('../../lib/secret/key.secret');

exports.read = async (res) => global.read(res, remission_details.name, remission_details.name_table);
exports.readByRemisionId = async (res, req) => {
    await pool.query(
        "SELECT p.PRO_NAME, sd.* FROM sv_product p, sv_remission_details sd WHERE sd.PRO_ID=p.PRO_ID AND sd.REM_ID=?",
        [req], (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                res.status(200).send(result);
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
}
/* exports.readByRemisionId = async (req, res) => {
    await pool.query(
        "SELECT p.PRO_NAME, sd.* FROM sv_product p, sv_remission_details sd WHERE sd.PRO_ID=p.PRO_ID AND sd.REM_ID=1",
         (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                res.status(200).send(result);
            } else {
                res.json({
                    message: err,
                    status: err
                });
            }
        }
    );
} */

exports.create = async (req, res) => global.create(res, remission_details.name, remission_details.name_table, req);
exports.IND = async (res) => global.IND(res, remission_details.name, remission_details.name_table, "RDT");
exports.readByOne = async (res, res_search) => global.readByOne(res, remission_details.name, remission_details.name_table, 'RDT_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, remission_details.name, remission_details.name_table, res_column, 'RDT_ID', res_update);
exports.deleteOne = async (res, res_delete) => global.delete(res, remission_details.name, remission_details.name_table, 'RDT_ID', res_delete);