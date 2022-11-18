const global = require('../../lib/globals/model.global');
const pool = require("../../connection/connection");
const { discounts_detail } = require('../../lib/secret/key.secret');

exports.searchProductWhitCategory = async (req, online, res) => {
    const sql = (req == "no" && online != "1") ? "SELECT * FROM sv_product p LIMIT 5" : `SELECT p.* FROM sv_product p LEFT JOIN sv_category c on (c.CAT_ID =p.CAT_ID) WHERE c.CAT_ID=? AND p.PRO_ONLINE=? AND p.PRO_AGOTADO = 1 AND p.PRO_ID 
    NOT IN(SELECT dd.PRO_ID FROM sv_discount_detail dd, sv_discounts d WHERE d.DIS_ID=dd.DIS_ID AND d.DIS_STATUS="1");`
    await pool.query(
        sql, [req, online],
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

exports.searchProductWhitName = async (req, online, res) => {
    const sql = `SELECT p.* FROM sv_product p WHERE 
    p.PRO_ID NOT IN(SELECT dd.PRO_ID FROM sv_discount_detail dd, sv_discounts d 
    WHERE d.DIS_ID=dd.DIS_ID AND d.DIS_STATUS="1") AND 
    (p.PRO_NAME LIKE '%${req}%' or p.PRO_BARCODE LIKE '%${req}%') AND p.PRO_ONLINE=?` + ((online == "1") ? " AND p.PRO_AGOTADO = 1" : "") + ";"
    await pool.query(
        sql, [online],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    err: err,
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

exports.DesabledDiscountByProductId = async (res, req) => {
    await pool.query('select DIS_ID from sv_discount_detail where PRO_ID=?', [req], (err, dis_id) => {
        // si hay algún error devolvemos el mensaje al cliente
        if (err) {
            return res.status(500).json({
                message: 'Oooops there was a error',
                error: err.message
            });
        }
        let promises = dis_id.map(id => {
            return new Promise((resolve, reject) => {
                pool.query(
                    'UPDATE sv_discounts SET DIS_STATUS ="0" WHERE DIS_ID=?', [id.DIS_ID],
                    (err, order_detail) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve({ message: "actualizado correctamento", order_detail });
                    });
            });
        });
        Promise.all(promises)
            .then(result => {
                res.status(200).json({
                    result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Oooops there was a error',
                    error: err.message
                });
            });
    });
}
exports.DiscountDetailByDiscountId = async (req, res) => {
    pool.query("select dd.DIS_ID, dd.DSP_ID ,p.*  from sv_discount_detail dd,sv_product p, sv_discounts d " +
        "where dd.DIS_ID=d.DIS_ID AND dd.PRO_ID=p.PRO_ID AND d.DIS_ID=?",
        [req], (err, result) => {
            if (result == undefined || result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else {
                if (result[0].length == 0) {
                    res.json({
                        message: "No se encuentran registros",
                        status: 200
                    });
                } else if (err == null) {
                    res.status(200).send(result);
                } else {
                    res.json({
                        message: err,
                        status: err
                    });
                }
            }

        })
}
exports.create = async (req, res) => global.create(res, discounts_detail.name, discounts_detail.name_table, req);
exports.read = async (res) => global.read(res, discounts_detail.name, discounts_detail.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, discounts_detail.name, discounts_detail.name_table, 'DIS_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, discounts_detail.name, discounts_detail.name_table, res_column, 'DSP_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, discounts_detail.name, discounts_detail.name_table, 'DSP_ID', res_update);