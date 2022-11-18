const global = require('../../lib/globals/model.global');
const { config } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.updateConfigTemplate = async(req, res) => {
    await pool.query("CALL PR_CONFIGTEMPLATE(?)", [req],
        (err, result) => {
            if (result === undefined || result.length == 0) {
                res.status(200).json({
                    message: "No se encuentran el template",
                    status: 200,
                });
            } else if (err == null) {
                res.status(200).send({
                    message: "Actualizado correctamente",
                    status: 200,
                });
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        });
};

exports.create = async(req, res) => global.create(res, config.name, config.name_table, req);
exports.read = async(res) => global.read(res, config.name, config.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, config.name, config.name_table, 'CON_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, config.name, config.name_table, res_column, 'CON_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, config.name, config.name_table, 'CON_ID', res_update);