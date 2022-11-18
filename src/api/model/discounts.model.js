const global = require('../../lib/globals/model.global');
const pool = require("../../connection/connection");
const codes = require("../../lib/responses/res.response");
const { discounts, discounts_detail } = require('../../lib/secret/key.secret');
exports.create = async (req, res) => {
    var discountId;
    var discount_detail = []
    await pool.query(
        "INSERT INTO " + discounts.name_table + " SET ? ", [req.discount],
        (err, result) => {
            if (err == null) {
                if (result) {
                    req.discounts_detail.map(async (val, idx) => {
                        val.DIS_ID = result.insertId;
                        discountId = result.insertId;
                        discount_detail.push([
                            val.DSP_ID,
                            val.DIS_ID,
                            val.PRO_ID
                        ])
                    });
                    pool.query("INSERT INTO " + discounts_detail.name_table + "( DSP_ID,DIS_ID,PRO_ID) VALUES ?", [discount_detail], async function (err) {
                        if (err) {
                            deleteOneHere(res, discounts.name, discounts.name_table, 'DIS_ID', discountId)

                        } else {
                            res.json({
                                message: codes.code_200(discounts_detail.name, "creado"),
                                status: 200,
                            });
                        }
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
};

exports.read = async (res) => global.read(res, discounts.name, discounts.name_table);
exports.readByOnline = async (res, res_search) => {
    await pool.query(
        "SELECT * FROM sv_discounts WHERE DIS_ONLINE = ?", [res_search],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registross",
                    status: 404,
                });
            } else if (err == null) {
                if (result.length == 0) {
                    res.status(404).json({
                        message: codes.code_404(name, "encontrado"),
                    });
                } else {
                    res.send(result);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(name, "buscar"),
                    err,
                });
            }
        }
    )
}

exports.readByOne = async (res, res_search) => global.readByOne(res, discounts.name, discounts.name_table, 'DIS_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, discounts.name, discounts.name_table, res_column, 'DIS_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, discounts.name, discounts.name_table, 'DIS_ID', res_update);
const deleteOneHere = async (
    res,
    name,
    table_name,
    parameter_condition,
    value_condition
) =>
    pool.query(
        "DELETE FROM " + table_name + " WHERE " + parameter_condition + " = ?", [value_condition],
        (err, result) => {
            if (err == null) {
                res.status(500).json({
                    message: codes.code_200(name, "eliminado"),
                });
            } else {

                res.status(500).json({
                    message: codes.code_500(name, "eliminar"),
                    err,
                });
            }
        }
    );