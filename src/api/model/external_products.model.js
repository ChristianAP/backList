const global = require('../../lib/globals/model.global');
const { external_products } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.getAlerts = async (res) => {
    await pool.query(
        `SELECT * FROM sv_alert`, (err, result) => {
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

exports.getProductType = async (res) => {
    await pool.query(
        `SELECT * FROM sv_product_type`, (err, result) => {
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
exports.getPaymenthMethod = async (res) => {
    await pool.query(
        `SELECT * FROM sv_payment_method`, (err, result) => {
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

exports.getExtermalProducts = async (res) => {
    await pool.query(
        `
            SELECT xp.*,if(xp.PMT_ID = 5, 'AL CONTADO', 'EN PARTES') as tipo_pago, p.PER_ID, p.PER_TRADENAME, p.PER_DNI, p.PER_EMAIL, p.PER_RUC, p.PER_NAME, 
            p.PER_N_PHONE, p.PER_CLIENT, p.PER_DIRECTION, p.PER_COUNTRY, a.ALR_NAME, pt.PRT_NAME, IF(xp.ETP_STATUS = '1','CANCELADO','PENDIENTE') AS ESTADO 
            FROM sv_external_products xp
            INNER JOIN sv_person p on xp.PER_ID = p.PER_ID 
            LEFT JOIN sv_alert a ON xp.ALT_ID = a.ALR_ID 
            LEFT JOIN sv_product_type pt ON xp.PRT_ID = pt.PRT_ID;		        
        `, (err, result) => {
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

exports.editStateCompra = async(res, req) => {
    await pool.query(
        "UPDATE sv_external_products SET ETP_STATUS = ? WHERE ETP_ID = ?", [req.ETP_STATUS, req.ETP_ID],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "ESTADO DE COMPRA ACTUALIZADO CORRECTAMENTE",
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

exports.create = async (req, res) => global.create(res, external_products.name, external_products.name_table, req);
exports.read = async (res) => global.read(res, external_products.name, external_products.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, external_products.name, external_products.name_table, 'ETP_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, external_products.name, external_products.name_table, res_column, 'ETP_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, external_products.name, external_products.name_table, 'ETP_ID', res_update);