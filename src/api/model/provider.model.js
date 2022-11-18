const global = require('../../lib/globals/model.global');
const pool = require("../../connection/connection");
const { provider } = require('../../lib/secret/key.secret');

exports.getProvider = async(res) => {
    await pool.query(
        "SELECT c.CLI_ID, concat_ws(' ', p.PER_NAME, p.PER_LASTNAME) AS PER_NAMES ,p.* FROM sv_client c, sv_person p WHERE c.CLI_TYPE IS NOT NULL AND p.PER_ID=c.PER_ID;",
        (err, result) => {
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

exports.create = async(req, res) => {
    global.create(res, provider.name, provider.name_table, req)
}
exports.read = async(res) => global.read(res, provider.name, provider.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, provider.name, provider.name_table, 'CLI_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, provider.name, provider.name_table, res_column, 'CLI_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, provider.name, provider.name_table, 'CLI_ID', res_update);