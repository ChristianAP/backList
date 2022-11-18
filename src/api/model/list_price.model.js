const global = require('../../lib/globals/model.global');
const pool = require("../../connection/connection");
const { listprice } = require('../../lib/secret/key.secret');
exports.SeletProducsWithoutPriceList = async (req, res) => {
    await pool.query(
        
        // "SELECT p.* FROM sv_product p WHERE NOT EXISTS (SELECT  null " +
        // "FROM sv_product_details pd WHERE pd.PRO_ID = p.PRO_ID AND " +
        // "pd.PRL_ID = (SELECT pl.PRL_ID FROM sv_price_list pl WHERE pl.PRL_ID=?)) AND p.PRO_ONLINE='0' OR p.PRO_FATHER_ID IS NOT NULL;", [req],
        `
        SELECT p.* FROM sv_product p WHERE NOT EXISTS (SELECT null
            FROM sv_product_details pd WHERE pd.PRO_ID = p.PRO_ID AND 
            pd.PRL_ID = (SELECT pl.PRL_ID FROM sv_price_list pl WHERE pl.PRL_ID=?)) AND p.PRO_ONLINE='0' OR p.PRO_FATHER_ID IS NOT NULL and p.PRO_ID NOT IN (SELECT PRO_ID FROM sv_product_details where PRL_ID = ?) 
        `, [req, req],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                if (result.length == 0) {
                    res.status(404).json({
                        message: codes.code_404(listprice.name, "encontrado"),
                    });
                } else {
                    res.send(result);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(listprice.name, "buscar"),
                    err,
                });
            }
        }
    )
}
exports.DesabledPriceList = async (res,req) => {
    await pool.query(
        "CALL PR_STATUSPRL(?)",[req],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (err == null) {
                res.json({
                    message: "funciono",
                    status: 200,
                });
            } else {
                res.json({
                    message: err,
                    status: 500,
                });
            }
        }
    )
}
exports.ProductsWithOutPriceListActive = async (res) => {
    await pool.query(
        "SELECT p.PRO_ID, p.PRO_NAME FROM sv_product p WHERE NOT EXISTS (SELECT  null " +
        "FROM sv_product_details pd WHERE pd.PRO_ID = p.PRO_ID AND " +
        "pd.PRL_ID = (SELECT pl.PRL_ID FROM sv_price_list pl WHERE pl.PRL_STATUS=1)) AND p.PRO_ONLINE='0' AND p.PRO_FATHER IS NULL;;",
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.send(result);
            } else if (err == null) {
                if (result.length == 0) {
                    res.status(404).json({
                        message: codes.code_404(listprice.name, "encontrado"),
                    });
                } else {
                    res.send(result);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(listprice.name, "buscar"),
                    err,
                });
            }
        }
    )
}
exports.create = async (req, res) => global.create(res, listprice.name, listprice.name_table, req);
exports.read = async (res, req) => {
    await pool.query(
        "SELECT * FROM sv_price_list pl WHERE pl.LCT_ID = ? ORDER BY pl.PRL_ID DESC;", [req],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.send(result);
            } else if (err == null) {
                if (result.length == 0) {
                    res.status(404).json({
                        message: codes.code_404(listprice.name, "encontrado"),
                    });
                } else {
                    res.send(result);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(listprice.name, "buscar"),
                    err,
                });
            }
        }
    )
};

exports.getListClient = async (res, res_search) => {
    await pool.query(
        `SELECT * FROM sv_list_client;`,
        [res_search],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "No se encuentran registros.",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200,
                });
            } else if (err == null) {
                res.status(200).send(result);
            } else {
                res.json({
                    message: err,
                    status: err,
                });
            }
        }
    );
}

exports.readByOne = async (res, res_search) => global.readByOne(res, listprice.name, listprice.name_table, 'PRL_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, listprice.name, listprice.name_table, res_column, 'PRL_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, listprice.name, listprice.name_table, 'PRL_ID', res_update);
