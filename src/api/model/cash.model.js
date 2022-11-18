const global = require('../../lib/globals/model.global');
const { cash_register } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.readCashRegister = async (res) => {

    await pool.query(
        `SELECT * FROM sv_cash_register;`, (err, result) => {
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
};

exports.readCashRegisterByUserID = async (res, USR_ID) => {

    await pool.query(
        `SELECT * FROM sv_cash_register where USR_ID = ?;`,[USR_ID], (err, result) => {
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
};

exports.getUltimoRegistroCajaPorID = async (res, USR_ID) => {

    await pool.query(
        `SELECT * FROM sv_cash_register WHERE USR_ID = ? ORDER BY CJA_ID DESC LIMIT 1;`,[USR_ID], (err, result) => {
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
};

exports.getsalesForCash = async (res, req) => {

    await pool.query(
        `SELECT d.* ,u.USR_USER,
        d.DOC_DATE as DOC_CREATE, CONCAT(d.DOC_SERIE, '-', d.DOC_NUMBER) AS NRO_COMPROBANTE FROM sv_document d, sv_user u, sv_person p
        WHERE p.USR_ID = u.USR_ID and d.DOC_USER_ID = u.usr_id and d.DOC_USER_ID = ? and d.DOC_DATE= ?`,
        [req.USR_ID, req.CJA_DATE_OPNING], (err, result) => {
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
};

exports.create = async (req, res) => global.create(res, cash_register.name, cash_register.name_table, req);
exports.read = async (res) => global.read(res, cash_register.name, cash_register.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, cash_register.name, cash_register.name_table, 'CJA_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, cash_register.name, cash_register.name_table, res_column, 'CJA_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, cash_register.name, cash_register.name_table, 'CJA_ID', res_update);
