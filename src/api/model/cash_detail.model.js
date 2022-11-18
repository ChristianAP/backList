const global = require('../../lib/globals/model.global');
const { cash_detail } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

// exports.readCashRegister = async (res) => {

//     await pool.query(
//         `SELECT * FROM sv_cash_register;`, (err, result) => {
//             if (result) {
//                 if (result.length == 0) {
//                     res.status(200).json({
//                         message: "No se encuentran registros",
//                         status: 200,
//                     });
//                 } else if (err == null) {
//                     res.status(200).send(result);
//                 } else {
//                     res.status(500).json({
//                         message: err,
//                         status: 500,
//                     });
//                 }
//             }
//         }
//     );
// };

exports.updateMonto = async (res, req) => {
    await pool.query(
        `UPDATE sv_cash_register SET CJA_OPNING_AMOUNT = ? WHERE CJA_ID = ? AND USR_ID = ?`,
        [req.CJA_OPNING_AMOUNT, req.CJA_ID, req.USR_ID],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "MONTO DE APERUTRA ACTUALIZADO CORRECTAMENTE!!",
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

exports.create = async (req, res) => global.create(res, cash_detail.name, cash_detail.name_table, req);
exports.read = async (res) => global.read(res, cash_detail.name, cash_detail.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, cash_detail.name, cash_detail.name_table, 'DCJ_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, cash_detail.name, cash_detail.name_table, res_column, 'DCJ_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, cash_detail.name, cash_detail.name_table, 'DCJ_ID', res_update);
