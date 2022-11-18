const global = require('../../lib/globals/model.global');
const { rol, access_rol } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");


exports.create = async (req, res) => {
    await pool.query(
        `INSERT INTO ${rol.name_table} SET ?`, [req.ROLE],
        (err, result) => {
            if (err || result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    error: err,
                    status: 500,
                });
            }else {
                const lastId = result.insertId;
                req.ACCESSES.map(val => {
                    pool.query(`INSERT INTO ${access_rol.name_table} SET ?`, [{
                        ROL_ID: lastId,
                        ACC_ID: val.ACC_ID,
                        ARO_STATUS: 1,
                    }])
                })
                res.status(200).json({
                    message: "Roles y accesos creados con exito",
                    status: 200,
                });
            }
        }
    );
    // global.create(res, rol.name, rol.name_table, req)
};
exports.read = async (res) => global.read(res, rol.name, rol.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, rol.name, rol.name_table, 'ROL_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, rol.name, rol.name_table, res_column, 'ROL_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, rol.name, rol.name_table, 'ROL_ID', res_update);