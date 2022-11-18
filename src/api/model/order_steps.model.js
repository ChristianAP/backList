const global = require('../../lib/globals/model.global');
const { order_steps } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");


exports.readSteps = async (res) => {
    await pool.query(
        `SELECT * FROM sv_order_steps WHERE ORS_STATUS = ?;`,
        ['1'], (err, result) => {
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
            }
        }
    );
}

exports.readStateDescriptionProducts = async (res) => {
    await pool.query(
        `SELECT * FROM sv_product_config_detail;`, (err, result) => {
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
            }
        }
    );
}

exports.updateStateProductDescription = async (res, req) => {
    await pool.query(
        `UPDATE sv_product_config_detail SET ? WHERE PCD_ID = ?`,
        [req, '1'],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "ESTADO DE DESCRIPCION ACTUALIZADO CORRECTAMENTE!!",
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

exports.validateDesactiveStep = async (res, POS_ID) => {
    await pool.query(
        `SELECT COUNT(*) AS NRO FROM sv_orders WHERE ORD_STATUS = ?`,
        [POS_ID],
        (err, result) => {
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
            }
        }
    );
}


exports.readStepsAll = async (res) => {
    await pool.query(
        `SELECT * FROM sv_order_steps;`,
        ['1'], (err, result) => {
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
            }
        }
    );
}

exports.updateStep = async (res, res_column, res_update) => global.update(res, order_steps.name, order_steps.name_table, res_column, 'ORS_ID', res_update);

exports.updateStepStatus = async (res, req) => {
    await pool.query(
        `UPDATE sv_order_steps SET ORS_STATUS = ? WHERE ORS_ID = ?`,
        [req.ORS_STATUS, req.ORS_ID],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "ESTADO DE PASOS DE VENTA ACTUALIZADO CORRECTAMENTE",
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
