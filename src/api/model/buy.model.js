const pool = require('../../connection/connection');
const global = require('../../lib/globals/model.global');
const { buy } = require('../../lib/secret/key.secret');

exports.test = async(req, res) => {
    await pool.query(
        "select s.STK_ID, p.PRO_ID from sv_stock as s, sv_product as p, sv_product_details as pd where p.PRO_ID = ? AND p.PRO_ID = pd.PRO_ID AND pd.PRD_ID = s.PRD_ID", [1],
        async(err, result) => {
            if (err) {

                res.json(result)
            } else {
                res.status(500).json({
                    message: "error:" + err,
                });
            }
        })
}
exports.getProductStock = async(res) => {
    await pool.query(
        `select pd.PRD_UNIT_PRICE, p.PRO_ID, p.PRO_NAME, s.STK_ID
        from  sv_product  as p
        inner join sv_product_details as pd ON pd.PRO_ID=p.PRO_ID
        inner join sv_price_list as pl ON pd.PRL_ID=pl.PRL_ID and pl.PRL_STATUS=1 and pl.LCT_ID = 1  
        left join sv_stock as s ON s.PRO_ID=p.PRO_ID`, [1],
        async(err, result) => {
            if (!err) {
                res.json(result)
            } else {
                res.status(500).json({
                    message: "error:" + err,
                });
            }
        })
}



exports.create = async(req, res) => {
    /**
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
                        message: codes.code_404(name, "encontrado"),
                    });
                } else {
                    var maximo = result[0][0].estado_venta
                    req.document.DOC_NUMBER = maximo;
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
                                                " SDT_DISCOUNT,SDT_TOTAL,SDS_DAYS_TO_SEND,SDS_STATUS) " +
                                                " VALUES ? ", [changeArray], //R4
                                                (err, result) => {
                                                    if (err == null) {
                                                        if (req.document.DOC_DOC_TYPE != "COTIZACION") {
                                                            var estado_cambio = false;
                                                            var num = 0;
                                                            var error = null;
                                                            while (estado_cambio == false && num < req.stock.length) {
                                                                pool.query(
                                                                    "call PR_UPDATE_STOCK(?,?,?)", [req.stock[num].STK_ID, req.stock[num].SDT_AMOUNT, req.document.DOC_DOC_TYPE], //R5
                                                                    (err, result) => {
                                                                        if (err == null) {
                                                                            estado_cambio = false;
                                                                            error = err;
                                                                        } else {
                                                                            estado_cambio = true;
                                                                            error = err;
                                                                            res.json({
                                                                                error: err
                                                                            })
                                                                        }
                                                                    }
                                                                );
                                                                num++;
                                                            }
                                                            if (estado_cambio == false) {
                                                                res.json({
                                                                    message: codes.code_200(
                                                                        "Se creo correctamente"
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
                                                            message: error,
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
                                )

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
exports.read = async(res) => global.read(res, buy.name, buy.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, buy.name, buy.name_table, 'BUY_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, buy.name, buy.name_table, res_column, 'BUY_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, buy.name, buy.name_table, 'BUY_ID', res_update);