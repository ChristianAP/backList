const pool = require("../../connection/connection");
const { dateForOperationsInDB } = require("../../lib/globals/date.global");
const global = require("../../lib/globals/model.global");
const codes = require("../../lib/responses/res.response");
const { document } = require("../../lib/secret/key.secret");
const { sales_description } = require("../../lib/secret/key.secret");
const here = require("./stock.model");
const { logger } = require('../../utils/logger');
const { send } = require("process");


exports.readAllDesc = async (res, fechaIni, fechaFin, tienda) =>
    await pool.query(
        ` select document.*,ps.POS_NAME , if (?=5,IFNULL(ps.POS_NAME,"No punto venta"),IFNULL(ps.POS_NAME,"Online")) FROM (select pm.PMT_NAME, d.*, DATE_FORMAT(d.DOC_DATE,'%d/%m/%Y') as DOC_DATE2, concat(d.DOC_SERIE,' - ',d.DOC_NUMBER) as COMPROBANTE, dt.DCT_NAME 
		from sv_document AS d, sv_payment_method pm ,sv_document_type as dt
		  where dt.DCT_ID=d.DCT_ID and d.SLT_ID= ? 
        AND pm.PMT_ID=d.PMT_ID AND (DOC_DATE BETWEEN ? AND ?)  ) AS document 
        LEFT JOIN sv_point_sale AS ps ON document.POS_ID=ps.POS_ID order by document.DOC_ID  desc;
        `, [tienda, tienda, fechaIni, fechaFin],
        async (err, result) => {
            if (result) {
                if (result.length == 0) {
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
            } else {
                res.json({
                    message: err,
                    status: err,
                });
            }
        }
    );

exports.readAllDescDetail = async (res, fechaIni, fechaFin, tienda) =>
    await pool.query(
        ` select document.*, if (?=5,IFNULL(ps.POS_NAME,"No punto venta"),IFNULL(ps.POS_NAME,"Online")) AS POS_NAME FROM 
        (select pm.PMT_NAME, d.*,sd.SDT_SUBTOTAL,sd.SDT_AMOUNT, DATE_FORMAT(d.DOC_DATE,'%d/%m/%Y') as DOC_DATE2, concat(d.DOC_SERIE,' - ',d.DOC_NUMBER) as COMPROBANTE,
         dt.DCT_NAME, CONCAT (p.PRO_NAME,' (',p.PRO_BARCODE,')') AS productos
       from sv_document AS d, sv_payment_method pm ,sv_document_type as dt, sv_sales_description AS sd, sv_product AS p
       
       where dt.DCT_ID=d.DCT_ID and d.SLT_ID= ?  AND sd.DOC_ID=d.DOC_ID AND sd.PRO_ID=p.PRO_ID
       AND pm.PMT_ID=d.PMT_ID AND (DOC_DATE BETWEEN ? AND ?)  ) AS document 
       LEFT JOIN sv_point_sale AS ps ON document.POS_ID=ps.POS_ID order by document.DOC_ID  desc;
   
        
        `, [tienda, tienda, fechaIni, fechaFin],
        async (err, result) => {
            if (result) {
                if (result.length == 0) {
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
            } else {
                res.json({
                    message: err,
                    status: err,
                });
            }
        }
    );

exports.getDetailByIdDocument = async (req) => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT p.PRO_NAME,p.PRO_BARCODE FROM sv_sales_description sd,sv_product p WHERE sd.DOC_ID=? AND p.PRO_ID=sd.PRO_ID
              `, [req],
            (err, result) => {
                try {
                    if (result.length > 0) {
                        var productos = ""

                        result.map((val) => {
                            productos += (val.PRO_NAME + "(" + val.PRO_BARCODE + "); ");

                        })
                        resolve([productos]);
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
exports.readConsilaionDoc = async (res, fechaIni, fechaFin) =>
    await pool.query(
        `select pm.PMT_NAME, d.*, DATE_FORMAT(d.DOC_DATE,'%d/%m/%Y') as DOC_DATE2, concat(d.DOC_SERIE,' - ',d.DOC_NUMBER) as COMPROBANTE, dt.DCT_NAME from sv_document as d, sv_payment_method pm ,sv_document_type as dt
        where dt.DCT_ID=d.DCT_ID and (d.SLT_ID=5 OR d.SLT_ID=15) and d.DOC_DOC_TYPE not IN ('COTIZACION','NOTA DE VENTA')
        AND pm.PMT_ID=d.PMT_ID AND d.DOC_ESTADO="0" AND (DOC_DATE BETWEEN ? AND ?)  order by d.DOC_ID  desc;`, [fechaIni, fechaFin],
        (err, result) => {
            if (result) {
                if (result.length == 0) {
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
            } else {
                res.json({
                    message: err,
                    status: err,
                });
            }
        }
    );
exports.getBusiness = async (res) =>
    await pool.query("select * from sv_business", (err, result) => {
        if (result.length == 0) {
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
    });
exports.readAllDescOnlyComp = async (res) =>
    await pool.query(
        "select d.*,concat(d.DOC_SERIE,' - ',d.DOC_NUMBER) as COMPROBANTE, DATE_FORMAT(d.DOC_DATE,'%d/%m/%Y') as DOC_DATE2, " +
        "dt.DCT_NAME " +
        "from sv_document as d,sv_document_type as dt " +
        "where dt.DCT_ID=d.DCT_ID and (d.SLT_ID=5 OR d.SLT_ID=15) and d.DOC_DOC_TYPE not IN ('COTIZACION','NOTA DE VENTA') order by d.DOC_ID   desc;",
        (err, result) => {
            if (result.length == 0) {
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

exports.createfromaddproduct = async (req, res) => {
    var date = await dateForOperationsInDB()
    await pool.query(
        `INSERT INTO ${document.name_table} SET ?`, [req.documento],
        (err, result) => {
            try {
                if (err === null) {
                    for (const product in req.productos) {
                        const dataProductoInsertInSaleDescription = {
                            DOC_ID: result.insertId,
                            PRO_ID: req.productos[product]["ID"],
                            SDT_AMOUNT: req.productos[product]["CANTIDAD"],
                            SDT_DESCRIPTION: req.productos[product]["NAME"],
                            SDT_PRICE: req.productos[product]["PRECIO"],
                            SDT_SUBTOTAL: req.productos[product]["TOTAL"],
                            SDT_TOTAL: req.productos[product]["TOTAL"],
                            SDS_TYPE: req.productos[product]["TYPE"],
                            SDT_DATE: date,
                            SDS_STATUS: "1",
                        };
                        pool.query(
                            `INSERT INTO ${sales_description.name_table} SET ?`, [dataProductoInsertInSaleDescription],
                            (err, result) => {
                                if (err) {
                                    res.status(500).json({
                                        message: "Error de servidor",
                                        error: err,
                                        status: 500,
                                    });
                                } else {
                                    var listIdsProduct = "";
                                    for (const idProduct in req.productos) {
                                        if (idProduct == req.productos.length - 1) {
                                            listIdsProduct = listIdsProduct.concat(
                                                `'${req.productos[idProduct]["ID"]}'`
                                            );
                                            here.createfromaddproduct(
                                                req.productos,
                                                res,
                                                listIdsProduct
                                            );
                                        } else {
                                            listIdsProduct = listIdsProduct.concat(
                                                `'${req.productos[idProduct]["ID"]}',`
                                            );
                                        }
                                    }
                                }
                            }
                        );
                    }
                } else {
                    logger.info(
                        `INSERT INTO ${document.name_table} SET ? : ${err} `,
                    )
                }
            } catch (error) {
                logger.info(
                    `INSERT INTO ${document.name_table} SET ? : ${err} `,
                )
                res.status(500).json({
                    message: "Error de servidor",
                    error: error,
                    status: 500,
                });
            }

        }
    );
};

exports.crearBuyDoc = async (req, res) => {
    /**
     *  * ----------compras
     * C1 - verificar si el comprobante fue agregado  - TABLA document tipo compra -- esto que lo haga el shoshua
     * C2 - registrar compra
     * c3 - registrar productos
     * C4 - aumnetar stock
     */
    await pool.query(
        "call PR_BUY_STATUS(?)", [req.document.DOC_SERIE, req.document.DOC_NUMBER],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                    error: err,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                if (result.length == 0) {
                    // validación de si existe el documento
                    res.status(404).json({
                        message: codes.code_404("encontrado"),
                    });
                } else {
                    if (result[0][0].encontrado == 0) {
                        // si no encuentra ningun documento con la misma serie y secuencia
                        pool.query(
                            "INSERT INTO " + document.name_table + " SET ?", [req.document], //C2
                            (err, result) => {
                                if (err == null) {
                                    //C3
                                    const lastId = result.insertId;
                                    //Change sal_id for lasid inserted on sales.name_table
                                    req.sales_description.map((obj) => (obj["DOC_ID"] = lastId));
                                    // change json object array to array
                                    var data = req.sales_description;
                                    var changeArray = data.map((doc) => Object.values(doc));
                                    pool.query(
                                        " INSERT INTO " +
                                        sales_description.name_table +
                                        " (DOC_ID,PRO_ID,DIS_ID,SDT_CODE,SDT_AMOUNT, " +
                                        " SDT_DESCRIPTION,SDT_PRICE,SDT_SUBTOTAL, " +
                                        " SDT_DISCOUNT,SDT_TOTAL,SDS_DAYS_TO_SEND,SDS_STATUS) " +
                                        " VALUES ? ", [changeArray], //C3
                                        (err, result) => {
                                            if (err == null) {
                                                //C4
                                                var estado_cambio = false;
                                                var num = 0;
                                                var error = null;
                                                while (
                                                    estado_cambio == false &&
                                                    num < req.stock.length
                                                ) {
                                                    pool.query(
                                                        "call PR_UPDATE_STOCK_BUY(?,?,?)", [
                                                        req.stock[num].STK_ID,
                                                        req.stock[num].SDT_AMOUNT,
                                                        req.document.DOC_DOC_TYPE,
                                                    ], //C4
                                                        (err, result) => {
                                                            if (err == null) {
                                                                estado_cambio = false;
                                                                error = err;
                                                            } else {
                                                                estado_cambio = true;
                                                                error = err;
                                                                res.json({
                                                                    error: err,
                                                                });
                                                            }
                                                        }
                                                    );
                                                    num++;
                                                }
                                                if (estado_cambio == false) {
                                                    res.json({
                                                        message: codes.code_200("Se creo correctamente"),
                                                        status: 200,
                                                        lastId: lastId,
                                                        error: err,
                                                        vars: changeArray,
                                                    });
                                                    //actualizar stocks
                                                } else {
                                                    res.json({
                                                        message: err,
                                                        status: 500,
                                                    });
                                                }
                                            } else {
                                                res.json({
                                                    message: err,
                                                    status: 500,
                                                });
                                            }
                                        }
                                    );
                                } else {
                                    res.json({
                                        message: err,
                                        status: 500,
                                    });
                                }
                            }
                        );
                    }
                    //==> C2
                }
            }
        }
    ); //C1
};

exports.updateDocument = async (seq, idDocument, res) => {
    await pool.query(
        "UPDATE sv_document_type SET DCT_SEQUENCE =? where DCT_ID = ?", [
        seq,
        idDocument
    ],
        (err, result) => {
            if (err == null) {
                res.json({
                    message: codes.code_200(
                        "Se creo correctamente"
                    ),
                    data: result
                })
            } else {
                estado_cambio = true;
                error = err;
                res.json({
                    error: err,
                });
            }
        }
    );
}

exports.createSale = async (req, res) => {
    /**
             * ---------ventas
             * flujo de registro de documento
             * - R1 - se valida por medio de el dct_id y el doc_number no se encuentre alguno registrado 
             * --- si hay registrdo 
             *      - coger el maximo
             *      -asignar el numero al maximo  
             * - R2 -se registra LA VENTA   
             * - R3 - sele suma 1 a la secuencia de sv_document_type 
             * - R4 - se registra los producto
             * - R5 - se resta cantidad al stock de productos
            
             */
    await pool.query(
        "call PR_SALE_STATUS(?,?);", [req.document.DCT_ID, req.document.DOC_NUMBER], //R1
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                    error: err,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                if (result.length == 0) {
                    res.status(404).json({
                        message: codes.code_404("encontrado"),
                    });
                } else {
                    var maximo = result[0][0].estado_venta;
                    req.document.DOC_NUMBER = maximo;
                    /* Cambiar Id del pago a plazos */
                    req.document.DOC_ESTADO = req.document.PMT_ID == 5 ? 1 : 0;
                    pool.query(
                        "INSERT INTO " + document.name_table + " SET ?", [req.document], //R2
                        (err, result) => {
                            if (err == null) {
                                const lastId = result.insertId;
                                //Change sal_id for lasid inserted on sales.name_table
                                req.sales_description.map((obj) => (obj["DOC_ID"] = lastId));
                                // change json object array to array
                                var data = req.sales_description;
                                var changeArray = data.map((doc) => Object.values(doc));
                                pool.query(
                                    " UPDATE sv_document_type SET DCT_SEQUENCE =? where DCT_ID = ?", [req.document.DOC_NUMBER, req.document.DCT_ID], //R3
                                    (err, result) => {
                                        if (err == null) {
                                            pool.query(
                                                " INSERT INTO " +
                                                sales_description.name_table +
                                                " (DOC_ID,PRO_ID,DIS_ID,SDT_CODE,SDT_AMOUNT, " +
                                                " SDT_DESCRIPTION,SDT_PRICE,SDT_SUBTOTAL, " +
                                                " SDT_DISCOUNT,SDT_TOTAL,SDS_DAYS_TO_SEND,SDT_DATE,SDS_STATUS) " +
                                                " VALUES ? ", [changeArray], //R4
                                                (err, result) => {
                                                    if (err == null) {
                                                        if (req.document.DOC_DOC_TYPE != "COTIZACION") {
                                                            var estado_cambio = false;
                                                            var num = 0;
                                                            var error = null;
                                                            while (
                                                                estado_cambio == false &&
                                                                num < req.stock.length
                                                            ) {
                                                                pool.query(
                                                                    "call PR_UPDATE_STOCK(?,?,?)", [
                                                                    req.stock[num].STK_ID,
                                                                    req.stock[num].SDT_AMOUNT,
                                                                    req.document.DOC_DOC_TYPE,
                                                                ], //R5
                                                                    (err, result) => {
                                                                        if (err == null) {
                                                                            estado_cambio = false;
                                                                            error = err;
                                                                        } else {
                                                                            estado_cambio = true;
                                                                            error = err;
                                                                            res.json({
                                                                                error: err,
                                                                            });
                                                                        }
                                                                    }
                                                                );
                                                                num++;
                                                            }
                                                            if (estado_cambio == false) {
                                                                res.json({
                                                                    message: codes.code_200(
                                                                        "Se creo correctamente",
                                                                        "Documento"
                                                                    ),
                                                                    status: 200,
                                                                    lastId: lastId,
                                                                    error: err,
                                                                    vars: changeArray,
                                                                });
                                                                //actualizar stocks
                                                            } else {
                                                                res.json({
                                                                    message: err,
                                                                    status: 500,
                                                                });
                                                            }
                                                        } else {
                                                            res.json({
                                                                message: codes.code_200(
                                                                    "Se creo correctamente"
                                                                ),
                                                                status: 200,
                                                                lastId: lastId,
                                                                error: err,
                                                                vars: changeArray,
                                                            });
                                                        }
                                                    } else {
                                                        res.json({
                                                            message: err,
                                                            status: 500,
                                                        });
                                                    }
                                                }
                                            );
                                        } else {
                                            res.json({
                                                message: err,
                                                status: 500,
                                            });
                                        }
                                    }
                                );
                            } else {
                                res.json({
                                    message: err,
                                    status: 500,
                                });
                            }
                        }
                    );
                }
            } else {
                res.status(500).json({
                    message: codes.code_500("buscar"),
                    err,
                });
            }
        }
    );
};
exports.create = async (req, res) =>
    global.create(res, document.name, document.name_table, req);
exports.read = async (res) =>
    global.read(res, document.name, document.name_table);

exports.readByOne = async (res, res_search) =>
    await pool.query(
        `select d.*, DATE_FORMAT(d.DOC_DATE,'%d/%m/%Y') as DOC_DATE2, dt.DCT_NAME, pm.PMT_NAME 
        from sv_document as d,sv_document_type as dt, sv_payment_method as pm 
        where dt.DCT_ID=d.DCT_ID and (d.SLT_ID=5 OR d.SLT_ID=15)  
        and pm.PMT_ID = d.PMT_ID AND d.DOC_ID=? order by d.DOC_ID DESC; `, [res_search],
        (err, result) => {
            if (result.length == 0) {
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
exports.updateOne = async (res, res_column, res_update) =>
    global.update(
        res,
        document.name,
        document.name_table,
        res_column,
        "DOC_ID",
        res_update
    );
exports.deleteOne = async (res, res_update) =>
    global.delete(res, document.name, document.name_table, "DOC_ID", res_update);

exports.getbuys = async (res) =>
    await pool.query("select * from sv_document WHERE DOC_SALE_TYPE='COMPRA'", (err, result) => {
        if (result.length == 0) {
            res.status(404).json({
                message: "No se encuentran compras",
                status: 404,
            });
        } else if (err == null) {
            res.status(200).send(result);
        } else {
            res.status(500).json({
                message: err,
                status: 500,
            });
        }
    });
