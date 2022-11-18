const global = require('../../lib/globals/model.global');
const { user_pointsale } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.readPOSByUserId = async (res, USR_ID) => {
    await pool.query(
        `SELECT p.*,TABLA.UPS_STATUS, TABLA.USR_ID FROM sv_point_sale p
        LEFT JOIN (SELECT up.*,ps.POS_NAME FROM sv_user_pointsale up, sv_point_sale ps 
                   WHERE up.USR_ID=? AND up.POS_ID=ps.POS_ID ) AS TABLA
        ON p.POS_ID=TABLA.POS_ID ORDER BY TABLA.UPS_STATUS DESC`,
        [USR_ID], (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    res.status(200).send(result);
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
};

exports.readPuntosUsuariosSelect = async (res, USR_ID) => {
    await pool.query(
        `select * from sv_user_pointsale WHERE USR_ID = ?`,
        [USR_ID], (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    res.status(200).send(result);
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

exports.create = async (req, res) => global.create(res, user_pointsale.name, user_pointsale.name_table, req);
exports.read = async (res) => global.read(res, user_pointsale.name, user_pointsale.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, user_pointsale.name, user_pointsale.name_table, 'UPS_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, user_pointsale.name, user_pointsale.name_table, res_column, 'UPS_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, user_pointsale.name, user_pointsale.name_table, 'UPS_ID', res_update);
exports.deleteByUsrId = async (res, res_update) => global.delete(res, user_pointsale.name, user_pointsale.name_table, 'USR_ID', res_update);