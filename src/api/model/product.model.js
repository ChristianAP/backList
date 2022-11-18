const global = require("../../lib/globals/model.global");
const pool = require("../../connection/connection");
const { product } = require("../../lib/secret/key.secret");

exports.create = async (req, res) => { global.create(res, product.name, product.name_table, req); }
exports.read = async (res) => { global.read(res, product.name, product.name_table); }
exports.readByOne = async (res, res_search) => { global.readByOne(res, product.name, product.name_table, "PRO_ID", res_search); }
exports.updateOne = async (res, res_column, res_update) => {
    global.update(
        res,
        product.name,
        product.name_table,
        res_column,
        "PRO_ID",
        res_update
    );
}
exports.deleteOne = async (res, res_update) => { global.delete(res, product.name, product.name_table, "PRO_ID", res_update); }

exports.warehouse = async (res) => {
    var stockalerts = await this.getForStockAlerts();
    var detainedalerts = await this.getDetainedAlerts();
    var result = Array.isArray(stockalerts) ? stockalerts.concat(Array.isArray(detainedalerts) ? detainedalerts : []) : [];
    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({
            message: "No se encuentran registros.",
            status: 404,
        });
    }

}

exports.getForStockAlerts = async () => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT I.STK_ID AS ID, "red.100" AS COLOR, CONCAT("El producto ", P.PRO_NAME, " tiene el stock actual de ",
        I.STK_TODAY, " unidades, y ha llegado a su Stock minimo de unidades, ingresa mas productos al stock") AS MESSAGE, 
        "S" AS TYPEALERT FROM sv_stock AS I, sv_product AS P WHERE I.PRO_ID = P.PRO_ID AND I.STK_TODAY <= 2 LIMIT 10; `,
            (err, result) => {
                try {
                    if (result.length > 0) {
                        resolve(result);
                    } else {
                        resolve({});
                    }
                } catch (error) {
                    resolve({})
                }
            }
        );
    });
}

exports.getDetainedAlerts = async () => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT S.STK_ID AS ID, CONCAT("El producto ", P.PRO_NAME, " tiene un stock actual de ", S.STK_TODAY, 
        " unidades, y no se ha vendido ninguna unidad hace ", DATEDIFF(CURDATE(), S.STK_DATE_UPGRADE), 
        " dias, la ultima venta registrada fue el ", S.STK_DATE_UPGRADE) AS MESSAGE, "PD" AS TYPEALERT, "yellow.100" AS COLOR
        FROM sv_stock AS S, sv_product AS P, sv_product_details AS PD
        WHERE S.PRO_ID = PD.PRO_ID AND PD.PRO_ID = P.PRO_ID AND DATEDIFF(CURDATE(), S.STK_DATE_UPGRADE) >= 30 LIMIT 10;`,
            (err, result) => {
                try {
                    if (result.length > 0) {
                        resolve(result);
                    } else {
                        resolve({});
                    }
                } catch (error) {
                    resolve({})
                }
            }
        );
    });
}

exports.getProductChildrensByFather = async (res, res_search) => {
    await pool.query(
        `SELECT p.*,pe.PER_NAME,pe.PER_LASTNAME,pe.PER_TRADENAME, 
        DATE_FORMAT(p.PRO_CREATE_DATE,'%d/%m/%Y') as PRO_CREATE_DATE2 
        FROM sv_product p, sv_client c, sv_person pe WHERE c.CLI_ID = p.CLI_ID 
        AND pe.PER_ID=c.PER_ID AND p.PRO_FATHER_ID = ?;`,
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

exports.getProductByCodeBar = async (res, res_search) => {
    await pool.query(
        `SELECT p.*,pd.PRD_UNIT_PRICE FROM sv_product p, sv_product_details pd, sv_price_list pl 
        WHERE pd.PRO_ID=p.PRO_ID AND pd.PRL_ID=pl.PRL_ID AND pl.PRL_STATUS=1
        AND p.PRO_BARCODE LIKE '%${res_search}%'; `,
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

exports.getTenProductOnline = async (res) => {
    await pool.query(
        `call SP_PRODUCT_ONLINE()`,
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
                res.status(200).send(result[0]);
            } else {
                res.json({
                    message: err,
                    status: err,
                });
            }
        }
    );
}

exports.getWithCatAndTrade = async (res, res_search) => {
    await pool.query(
        "SELECT  p.*,c.CAT_NAME FROM sv_product p, sv_category c WHERE p.CAT_ID = c.CAT_ID AND p.PRO_ONLINE = ?  AND p.PRO_FATHER_ID IS NULL",
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
exports.findBySearch = async (res, res_search) => {
    await pool.query(
        'CALL PR_PRODUCTBYSEARCH(?,1)', [res_search],
        (err, products) => {
            if (products) {
                if (products === undefined) {
                    res.status(500).json({
                        message: "Error de servidor",
                        status: 500,
                    });
                } else if (products[0].length == 0) {
                    res.json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    pool.query(
                        "CALL PR_PRODUCTBYSEARCH(?,2)", [res_search], (err, result) => {
                            if (result.length == 0) {
                                res.json({
                                    message: "No se encuentran registros",
                                    status: 200
                                });
                            } else if (err == null) {
                                let productos = products[0].map((val) => {
                                    for (let i = 0; i < result[0].length; i++) {
                                        const prod = result[0][i];
                                        if (prod.PRO_ID == val.PRO_ID) {
                                            return prod
                                        }
                                    }
                                    return val
                                })
                                res.status(200).send(productos);
                            } else {
                                res.json({
                                    message: err,
                                    status: err
                                });
                            }
                        }
                    );

                } else {
                    res.json({
                        message: err,
                        status: err,
                    });
                }
            } else {
                res.json({
                    message: products,
                    status: err,
                });
            }

        }
    );
}
exports.findByCategory = async (res, res_search) => {
    await pool.query(

        "CALL PR_PRODUCTBYCATEGORY(1, ?)", [res_search],
        (err, products) => {
            if (products) {
                if (products === undefined) {
                    res.status(500).json({
                        message: "Error de servidor",
                        status: 500,
                    });
                } else if (products[0].length == 0) {
                    res.json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    pool.query(
                        "CALL PR_PRODUCTBYCATEGORY(2, ?)", [res_search], (err, result) => {
                            if (result.length == 0) {
                                res.json({
                                    message: "No se encuentran registros",
                                    status: 200
                                });
                            } else if (err == null) {
                                let productos = products[0].map((val) => {
                                    for (let i = 0; i < result[0].length; i++) {
                                        const prod = result[0][i];
                                        if (prod.PRO_ID == val.PRO_ID) {
                                            return prod
                                        }
                                    }
                                    return val
                                })
                                res.status(200).send(productos);
                            } else {
                                res.json({
                                    message: err,
                                    status: err
                                });
                            }
                        }
                    );

                } else {
                    res.json({
                        message: err,
                        status: err,
                    });
                }
            } else {
                res.json({
                    message: products,
                    status: err,
                });
            }

        }
    );
}

exports.findByCategoryId = async (res, catId) => {
    await pool.query(
        `SELECT p.* FROM sv_product p, sv_category c WHERE p.CAT_ID=c.CAT_ID AND c.CAT_ID=? AND PRO_ONLINE=0 AND p.PRO_FATHER_ID IS NULL`,
        [catId], (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
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
        })

}

exports.findRemissionsProducts = async (res, remision, catid, lct_id) => {
    await pool.query(
        remision == 0 ? `
        SELECT pd.PRD_ID,pd.PRO_ID,pd.PRD_UNIT_PRICE,
        p.PRO_NAME,p.PRO_IMAGE,p.PRO_CODE, p.PRO_INAFECT, 
        p.PRO_FATHER_ID,
        s.STK_TODAY,s.STK_ID,
        pl.PRL_STATUS, 
        ot.DIS_NAME, 
        ot.DIS_STATUS, 
        ot.DIS_PERCENTAGE,
        ot.DIS_ID,
        cli_per.*
        FROM sv_product p
            inner join sv_product_details as pd ON pd.PRO_ID=p.PRO_ID 
        inner join sv_price_list as pl ON pd.PRL_ID=pl.PRL_ID and pl.PRL_STATUS=1 
        inner join sv_client AS cl ON cl.CLI_ID=p.CLI_ID
        left join sv_stock as s ON s.PRO_ID=p.PRO_FATHER_ID
        left JOIN (SELECT c.CLI_ID,p.PER_ID,p.PER_NAME,p.PER_DNI,p.PER_RUC, p.PER_DIRECTION,p.PER_TRADENAME FROM sv_client c,sv_person p WHERE c.PER_ID=p.PER_ID) as cli_per ON cli_per.CLI_ID=p.CLI_ID
        left join 
        (select dd.DIS_ID,dd.PRO_ID,d.DIS_NAME,d.DIS_STATUS,d.DIS_PERCENTAGE
        from sv_discount_detail as dd, sv_discounts as d 
        where dd.DIS_ID=d.DIS_ID and d.DIS_STATUS=1)
        as ot ON ot.PRO_ID=p.PRO_ID
        WHERE p.PRO_REMISION=0 ${(catid != 0) ? "AND p.CAT_ID = " + catid : ""} AND s.STK_TODAY>0 AND p.PRO_STATUS=1 and LCT_ID = ${lct_id} 
        UNION ALL
        select pd.PRD_ID,pd.PRO_ID,pd.PRD_UNIT_PRICE,
            p.PRO_NAME,p.PRO_IMAGE,p.PRO_CODE, p.PRO_INAFECT, 
            p.PRO_FATHER_ID,
            s.STK_TODAY,s.STK_ID,
            pl.PRL_STATUS, 
            ot.DIS_NAME, 
            ot.DIS_STATUS, 
            ot.DIS_PERCENTAGE,
            ot.DIS_ID,
            cli_per.*
            from  sv_product AS p
            inner join sv_product_details as pd ON pd.PRO_ID=p.PRO_ID 
            inner join sv_price_list as pl ON pd.PRL_ID=pl.PRL_ID and pl.PRL_STATUS=1  and LCT_ID = ${lct_id} 
            left join sv_stock as s ON s.PRO_ID=p.PRO_ID
            left JOIN (SELECT c.CLI_ID,p.PER_ID,p.PER_NAME,p.PER_DNI,p.PER_RUC, p.PER_DIRECTION,p.PER_TRADENAME FROM sv_client c,sv_person p WHERE c.PER_ID=p.PER_ID) as cli_per ON cli_per.CLI_ID=p.CLI_ID
            left join 
            (select dd.DIS_ID,dd.PRO_ID,d.DIS_NAME,d.DIS_STATUS,d.DIS_PERCENTAGE
            from sv_discount_detail as dd, sv_discounts as d 
            where dd.DIS_ID=d.DIS_ID and d.DIS_STATUS=1)
            as ot ON ot.PRO_ID=p.PRO_ID
            WHERE p.PRO_REMISION=0 ${(catid != 0) ? "AND p.CAT_ID = " + catid : ""} AND s.STK_TODAY>0`
            :
            `SELECT p.* FROM sv_product p WHERE p.PRO_REMISION = ? ${catid != 0 ? "AND p.CAT_ID = " + catid : ""}; `,
        // WHERE p.PRO_REMISION=? AND s.STK_TODAY>0`: `SELECT p.* FROM sv_product p WHERE p.PRO_REMISION=?;`,
        [remision], (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    err: err,
                    status: 500,
                });
            } else if (result.length == 0) {
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
        })

}

exports.findProductWithDiscount = async (res) => {
    await pool.query(
        "CALL SP_OFERTAS();", (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                res.status(200).send(result[0]);
            } else {
                res.json({
                    message: err,
                    status: err
                });
            }
        }
    );
}

exports.getUnitMean = async (res) => {
    await pool.query(
        `SELECT * FROM sv_unit_mean`,
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

// exports.findProductWithDiscountAndName = async (req, res) => {
/* await pool.query(
    "CALL PR_PRODUCTBYSEARCH(?,2)", [req], (err, result) => {
        if (result) {
            if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                res.status(200).send(result[0]);
            } else {
                res.json({
                    message: err,
                    status: err
                });
            }
        } else {
            res.json({
                message: err,
                status: err
            });
        }
    }
); */
// }
