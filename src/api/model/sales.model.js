const global = require("../../lib/globals/model.global");
const { sales } = require("../../lib/secret/key.secret");
const { sales_product } = require("../../lib/secret/key.secret");
const codes = require("../../lib/responses/res.response");
const pool = require("../../connection/connection");
const { updateProductNoAgotado } = require("./orders.model");

exports.read = async (res) => {
    global.read(res, sales.name, sales.name_table);
};

exports.readByOne = async (res, res_search) => {
    global.readByOne(res, sales.name, sales.name_table, "SAL_ID", res_search);
};

exports.updateOne = async (res, res_column, res_update) => {
    global.update(
        res,
        sales.name,
        sales.name_table,
        res_column,
        "SAL_ID",
        res_update
    );
};

exports.deleteOne = async (res, res_update) => {
    global.delete(res, sales.name, sales.name_table, "SAL_ID", res_update);
};

exports.verifyvoucher = async (res, res_column, res_update) => {
    await pool.query(
        "UPDATE sv_orders SET ? WHERE ORD_ID = ?", [res_update, res_column],
        async (err) => {
            if (err == null) {
                if (res_update.ORD_APPROVAL == 2) {
                    await updateProductNoAgotado(res_column);
                }
                res.status(200).json({
                    message: codes.code_201(sales.name, "actualizado"),
                    status: 200,
                });
            } else {
                res.status(500).json({
                    message: codes.code_500(sales.name, "actualizar"),
                    err,
                });
            }
        }
    );
};

exports.create = async (req, res) => {
    await pool.query(
        "INSERT INTO " + sales.name_table + " SET ?", [req.sv_sales],
        (err, result) => {
            if (err == null) {
                const lastId = result.insertId;
                //Change sal_id for lasid inserted on sales.name_table
                req.sv_sales_product.map((obj) => (obj["SAL_ID"] = result.insertId));
                // change json object array to array
                var data = req.sv_sales_product;
                var changeArray = data.map((doc) => Object.values(doc));

                pool.query(
                    "INSERT INTO " +
                    sales_product.name_table +
                    " (PRD_ID, SAL_ID,SPR_STATUS)" +
                    " VALUES ?", [changeArray],
                    (err, result) => {
                        if (err == null) {
                            res.json({
                                message: codes.code_200(
                                    sales_product.name,
                                    "Se creo correctamente"
                                ),
                                status: 200,
                                lastId: lastId,
                                vars: changeArray,
                            });
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
};

exports.readsalesonline = async (res, fechaIni, fechaFin) => {
    await pool.query(
        `SELECT OD.ORD_ID AS PEDIDO,OD.ORD_STATUS AS ESTADO, PE.PER_ID AS IDCLIENT, CONCAT(PE.PER_NAME, ' ', PE.PER_LASTNAME) 
        AS CLIENTE, OD.ORD_TOTAL_PRICE AS TOTAL, OD.ORD_IGV AS IGV, OD.ORD_DISCOUNT_PRICE AS DESCUENTO, OD.ORD_VOUCHER AS VOUCHER, 
        OD.ORD_DATE_ORDER AS FECHA, OD.ORD_APPROVAL AS APROBACION, PE.PER_EMAIL AS EMAIL, PE.PER_TRADENAME AS TRADENAME, PE.PER_N_PHONE AS PHONE, US.USR_USER AS APROBADOR,
        DATE_FORMAT(OD.ORD_DATE_ORDER,'%d/%m/%Y') as ORD_DATE_ORDER2,CONCAT(PE.PER_DEPARTMENT, ' ', PE.PER_PROVINCE, ' ', PE.PER_DISTRIC, ' ', PE.PER_DIRECTION) AS DIRECCION, OD.ORD_METODO_PAGO as METODO_PAGO
        FROM sv_orders AS OD 
        LEFT JOIN sv_user AS US ON US.USR_ID = OD.ORD_APPROVAL_USER
        INNER JOIN sv_client AS CL ON OD.CLI_ID = CL.CLI_ID 
		INNER JOIN sv_person AS PE ON CL.PER_ID = PE.PER_ID 
		WHERE OD.ORD_DATE_ORDER BETWEEN ? AND ?	
        ORDER BY OD.ORD_ID DESC`, [fechaIni, fechaFin],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    err: err,
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                res.status(200).json(result);
            } else {
                res.json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readproductssalesonline = async (res, idsale) => {
    await pool.query("CALL PR_PRODUCTS(?)", [idsale], (err, result) => {
        if (!err) {
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
                res.send(result[0]);
            } else {
                res.json({
                    message: err,
                    status: 500,
                });
            }
        } else {
            res.json({
                message: err.errno,
                status: 500,
            });
        }
    });
};

exports.readsaleswithclient = async (res, res_search) =>
    await pool.query(
        "SELECT " +
        "S.*,S.PER_ID,P.PER_NAME,P.PER_LASTNAME,P.PER_DNI,P.PER_RUC,p.PER_EMAIL,PER_DIRECTION,P.PET_ID,P.PER_TRADENAME " +
        " FROM " +
        sales.name_table +
        " AS S, sv_person AS P " +
        " WHERE S.PER_ID=P.PER_ID AND SAL_ID =" +
        res_search,
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor: " + err,
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                res.send(result);
            } else {
                res.json({
                    message: err,
                    status: 500,
                });
            }
        }
    );

    exports.deleteDocument = async (res, req) => {
        await pool.query(
            `Delete from sv_sales_description WHERE DOC_ID = ?;`,
            [req],
            async (err, result) => {
                if (err == null) {
                    if (result) {
                        
                        await pool.query(
                            `Delete from sv_document WHERE doc_ID = ?;`,
                            [req],
                            (err2, result2) => {
                                if (err2 == null) {
                                    if (result2) {
                                        res.json({
                                            message: "DOCUMENTO ELIMINADO CORRECTAMENTE",
                                            status: 200,
                                        });
                                    } else {
                                        res.status(500).json({
                                            message: err2,
                                            status: 500,
                                        });
                                    }
                                } else {
                                    res.status(500).json({
                                        message: err2,
                                        status: 500,
                                    });
                                }
                            }
                        );
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