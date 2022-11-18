const global = require('../../lib/globals/model.global');
const pool = require("../../connection/connection");
const { product_details } = require('../../lib/secret/key.secret');

exports.findProductWithDiscountById = async (res, id, cantidad) => await pool.query(
    "CALL PR_DETAILPRODUCTWITHDISCOUNT(?,?)", [cantidad, id], (err, result) => {
        try {
            if (result.length === 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                res.status(200).send(result[0]);
            }
        } catch (error) {
            res.status(500).json({
                message: err,
                status: 500
            });
        }
    }
);
exports.findProductDetail = async (res, id, cantidad) => await pool.query(
    `call PR_FIND_PRODUCT_DATAIL(?,?);`, [cantidad, id], (err, result) => {
        if (!err) {
            if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                res.status(200).send(result[0]);
            } else {
                res.status(500).json({
                    message: err,
                    status: 500
                });
            }
        } else {
            res.status(500).json({
                message: err,
                status: 500
            });
        }
    }
);
//obtiene el nombre, precio, cantidad e imagen para mostrarlo en modulo de ventas
exports.findProductDetailWithProductAndStock = async (res, query) => await pool.query(
    `select pd.PRD_ID,pd.PRO_ID,pd.PRD_UNIT_PRICE,
    p.PRO_NAME,p.PRO_IMAGE,p.PRO_CODE,
    s.STK_TODAY,s.STK_ID,
    pl.PRL_STATUS, 
    ot.DIS_NAME, 
    ot.DIS_STATUS, 
    ot.DIS_PERCENTAGE,
    ot.DIS_ID
    from  sv_product as p
    inner join sv_product_details as pd ON pd.PRO_ID=p.PRO_ID and p.PRO_NAME like '%${query}%' 
    inner join sv_price_list as pl ON pd.PRL_ID=pl.PRL_ID and pl.PRL_STATUS=1 and pl.LCT_ID = 1  
    left join sv_stock as s ON s.PRO_ID=p.PRO_ID
    left join 
    (select dd.DIS_ID,dd.PRO_ID,d.DIS_NAME,d.DIS_STATUS,d.DIS_PERCENTAGE
    from sv_discount_detail as dd, sv_discounts as d 
    where dd.DIS_ID=d.DIS_ID and d.DIS_STATUS=1)
    as ot ON ot.PRO_ID=p.PRO_ID`, (err, result) => {
    if (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    } else if (result.length == 0) {
        res.status(404).json({
            message: "No se encuentran registros",
            status: 404
        });
    } else if (err == null) {
        res.status(200).send(result);
    } else {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
}
);

exports.findProductDetailWithStock = async (res) => await pool.query(
    `select pd.PRD_ID,pd.PRO_ID,pd.PRD_UNIT_PRICE,
    p.PRO_NAME,p.PRO_IMAGE,p.PRO_CODE,
    s.STK_TODAY,s.STK_ID,
    pl.PRL_STATUS, 
    ot.DIS_NAME, 
    ot.DIS_STATUS, 
    ot.DIS_PERCENTAGE,
    ot.DIS_ID
    from  sv_product as p
    inner join sv_product_details as pd ON pd.PRO_ID=p.PRO_ID 
    inner join sv_price_list as pl ON pd.PRL_ID=pl.PRL_ID and pl.PRL_STATUS=1 and pl.LCT_ID = 1 
    left join sv_stock as s ON s.PRO_ID=p.PRO_ID
    left join 
    (select dd.DIS_ID,dd.PRO_ID,d.DIS_NAME,d.DIS_STATUS,d.DIS_PERCENTAGE
    from sv_discount_detail as dd, sv_discounts as d 
    where dd.DIS_ID=d.DIS_ID and d.DIS_STATUS=1)
    as ot ON ot.PRO_ID=p.PRO_ID 
    where p.PRO_REMISION=0`, (err, result) => {
    if (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    } else if (result.length == 0) {
        res.status(404).json({
            message: "No se encuentran registros",
            status: 404
        });
    } else if (err == null) {
        res.status(200).send(result);
    } else {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
}
);
//
exports.readByIDPL = async (res, res_search) => {
    await pool.query(
        "SELECT pd.*, p.PRO_NAME FROM sv_product_details pd " +
        "INNER JOIN sv_product p ON p.PRO_ID = pd.PRO_ID  WHERE pd.PRL_ID = ?", [res_search],
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
                        message: codes.code_404(product_details.name, "encontrado"),
                    });
                } else {
                    res.send(result);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(product_details.name, "buscar"),
                    error: err,
                    status: 500
                });
            }
        }
    );
};
exports.readPriceListActivo = async (res) => {
    await pool.query(
        'SELECT p.PRO_ID, p.PRO_NAME, pd.PRD_UNIT_PRICE, pd.PRD_PACKAGE_PRICE FROM sv_product p ' +
        'LEFT JOIN sv_product_details pd on (p.PRO_ID =pd.PRO_ID) ' +
        'INNER JOIN sv_price_list pl on (pl.PRL_ID = pd.PRL_ID) ' +
        'WHERE pl.PRL_STATUS="1" and pl.LCT_ID = "1";',
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
                        message: codes.code_404(product_details.name, "encontrado"),
                    });
                } else {
                    res.send(result);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(product_details.name, "buscar"),
                    error: err,
                    status: 500
                });
            }
        }
    );
};

/// para el exportar a excel de lista de precios
exports.exportListPrice = async (res, req) => await pool.query(
    `call SP_EXPORT_LISTPRICE(?)`,[req], (err, result) => {
    if (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    } else if (result.length == 0) {
        res.status(404).json({
            message: "No se encuentran registros",
            status: 404
        });
    } else if (err == null) {
        res.status(200).send(result[0]);
    } else {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
}
);

exports.create = async (req, res) => global.create(res, product_details.name, product_details.name_table, req);
exports.read = async (res) => global.read(res, product_details.name, product_details.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, product_details.name, product_details.name_table, 'PRD_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, product_details.name, product_details.name_table, res_column, 'PRD_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, product_details.name, product_details.name_table, 'PRD_ID', res_update);