const global = require('../../lib/globals/model.global');
const { codebar_config } = require('../../lib/secret/key.secret');

const pool = require("../../connection/connection");

exports.listCodebars = async(res, req) => {
    await pool.query(
        `SELECT * FROM sv_codebar_config;`, (err, result) => {
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

exports.updateConfCodebar = async (res, req) => {
    await pool.query(
        `UPDATE sv_codebar_config SET CDC_LENGTH = ?, CDC_DISTANCE = ? WHERE CDC_ID = ?;`,
        [req.CDC_LENGTH, req.CDC_DISTANCE, req.CDC_ID],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "CÓDIGO DE BARRAS MODIFICADO CORRECTAMENTE",
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

exports.updateIDSOtherCodebars = async (res, req) => {
    await pool.query(
        `UPDATE sv_codebar_config SET CDC_LENGTH = ? WHERE CDC_ID = ?;`,
        [req.CDC_LENGTH,'2'],
        async (err, result) => {
            if (err == null) {
                if (result) {
                    
                    await pool.query(
                        `UPDATE sv_codebar_config SET CDC_LENGTH = ? WHERE CDC_ID = ?;`,
                        [req.CDC_LENGTH, '3'],
                        (err2, result2) => {
                            if (err2 == null) {
                                if (result2) {
                                    res.json({
                                        message: "LONGITUD DE DE BARRAS 2 y 3 MODIFICADO CORRECTAMENTE",
                                        status: 200,
                                    });
                                } else {
                                    res.status(500).json({
                                        message: err2,
                                        status: 500,
                                    });
                                }
                            } else {
                                res.status(500).json({
                                    message: err2,
                                    status: 500,
                                });
                            }
                        }
                    );
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



// exports.create = async(req, res) => global.create(res, codebar_config.name, codebar_config.name_table, req);
// exports.read = async(res) => global.read(res, codebar_config.name, codebar_config.name_table);
// exports.readByOne = async(res, res_search) => global.readByOne(res, codebar_config.name, codebar_config.name_table, 'PRT_ID', res_search);
// exports.updateOne = async(res, res_column, res_update) => global.update(res, codebar_config.name, codebar_config.name_table, res_column, 'PRT_ID', res_update);
// exports.deleteOne = async(res, res_update) => global.delete(res, codebar_config.name, codebar_config.name_table, 'PRT_ID', res_update);