const pool = require("../../connection/connection");
const global = require("../../lib/globals/model.global");
const mysqlConnection = require("../../connection/connection");

exports.create = async (req, res) => { global.create(res, "Alertas", "sv_temporary_alerts", req); }

exports.createFromServer = async (dataTicket) => {
    return new Promise((resolve) => {
        mysqlConnection.query(
            `INSERT INTO sv_temporary_alerts SET ?`, [dataTicket],
            (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        console.log(err);
                    } else if (rows.length != 0) {
                        resolve(rows);
                    } else if (rows.length == 0) {
                        console.log(err);
                    }
                } else {
                    console.log(err);
                }
            }
        );
    });
};

exports.read = async (res) => {
    await pool.query(
        `SELECT * FROM sv_temporary_alerts WHERE TEA_STATUS = 0 ORDER BY TEA_ID DESC LIMIT 10`,
        (err, result) => {
            if (err || result.length == 0) {
                res.status(200).json({
                    message: "Sin alertas disponibles",
                    status: 200,
                });
            } else if (err === null) {
                res.status(200).send(result);
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.read_history = async (res) => {
    await pool.query(
        `SELECT * FROM sv_temporary_alerts ORDER BY TEA_ID DESC`,
        (err, result) => {
            if (err) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(200).json({
                    message: "Sin alertas disponibles",
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
    );
};

exports.updateStatus = async (res, idAlert) => {
    await pool.query(
        "UPDATE sv_temporary_alerts SET TEA_STATUS = 1 WHERE TEA_ID = ?", [idAlert],
        (err, result) => {
            if (err == null) {
                res.status(200).json({
                    message: "Alerta actualizada",
                    status: 200,
                });
            } else {
                res.status(500).json({
                    message: "Error en la actualización",
                    error: err,
                    status: 500,
                });
            }
        }
    );
};