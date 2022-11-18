const global = require('../../lib/globals/model.global');
const { order, order_detail } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");
const codes = require("../../lib/responses/res.response");
//
exports.create = async (req, res) => {
    var orderId;
    var orders_detail = []
    await pool.query(
        "INSERT INTO " + order.name_table + " SET ? ", [req.order],
        (err, result) => {
            if (err == null) {
                if (result) {
                    req.orders_detail.map(async (val, idx) => {
                        if (val.ODT_ONLINE) {
                            this.updateProductAgotado("0", val.PRO_ID)
                        }
                        val.ORD_ID = result.insertId;
                        orderId = result.insertId;
                        orders_detail.push([
                            val.ODT_ID,
                            val.ORD_ID,
                            val.PRO_ID,
                            val.ODT_DAYS_TO_SENDE,
                            val.ODT_AMOUNT,
                            val.ODT_SUBTOTAL,
                            val.ODT_STATUS
                        ])
                    });
                    pool.query("INSERT INTO " + order_detail.name_table + "( ODT_ID, ORD_ID, PRO_ID, ODT_DAYS_TO_SENDE, ODT_AMOUNT, ODT_SUBTOTAL, ODT_STATUS) VALUES ?", [orders_detail], async (err, result) => {
                        if (err) {
                            deleteOne(res, order.name, order.name_table, 'ORD_ID', orderId)
                        } else {
                            res.json({
                                message: codes.code_200(order_detail.name, "creado"),
                                orderId: orderId,
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

exports.validationAlert = async (res, req) => {
    var invalido = "";
    var items = []
    try {
        for (let i = 0; i < req.orders_detail.length; i++) {
            const order_det = req.orders_detail[i];
            const productoOut = await this.getIfProductOut(order_det.id)
            if (productoOut[0].PRO_AGOTADO == "0") {
                invalido += "1"
                items.push(productoOut[0])
            }
        }
        if (invalido.length == 0) {
            res.json({
                message: "Item Disponible",
                status: 200,
            });
        }
        else {
            res.json({
                message: "Item Ocupado",
                items: items,
                status: 200,
            });
        }
    } catch (error) {
        res.json({
            message: "error del sistema",
            error: error,
            status: 500,
        });
    }
}

exports.changeStatusOrder = async (res, req) => {
    var invalido = "";
    var items = []
    console.log(req.orders_detail);
    try {
        for (let i = 0; i < req.orders_detail.length; i++) {
            const order_det = req.orders_detail[i];
            const productoOut = await this.getIfProductOut(order_det.id)
            if (productoOut[0].PRO_AGOTADO == "0") {
                invalido += "1"
                items.push(productoOut[0])
            }
        }
        if (invalido.length == 0) {
            for (let i = 0; i < req.orders_detail.length; i++) {
                const order_det = req.orders_detail[i];
                if (order_det.peso > 0) {
                    await this.updateProductAgotado("0", order_det.id)
                }
            }
            res.json({
                message: "Item Disponible",
                status: 200,
            });
        }
        else {
            res.json({
                message: "Item Ocupado",
                items: items,
                status: 200,
            });
        }
    } catch (error) {
        res.json({
            message: "error del sistema",
            error: error,
            status: 500,
        });
    }
}

exports.closeAlert = async (res, req) => {
    var items = []
    try {
        for (let i = 0; i < req.orders_detail.length; i++) {
            const order_det = req.orders_detail[i];
            await this.updateProductAgotado("1", order_det.id)
        }
        res.json({
            message: "actualizados",
            status: 200,
        });

    } catch (error) {
        res.json({
            message: "error del sistema",
            error: error,
            status: 500,
        });
    }
}

exports.ChangeStatus = async (res, status, idorder) => {
    await pool.query(
        "UPDATE sv_orders o SET o.ORD_STATUS = ? WHERE o.ORD_ID=?", [status, idorder],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: codes.code_200(order_detail.name, "creado"),
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
};

exports.read = async (res) => global.read(res, order.name, order.name_table);

exports.exportOrders = async (res, fechaIni, fechaFin) => await pool.query(
    `SELECT p.*,o.ORD_ID,o.ORD_DATE_ORDER,o.ORD_TOTAL_PRICE FROM sv_orders o,sv_client c, sv_person p 
    WHERE o.ORD_APPROVAL="1" AND o.ORD_STATUS>"1"  AND o.ORD_STATUS<"4" AND c.CLI_ID=o.CLI_ID AND p.PER_ID=c.PER_ID
	 AND o.ORD_DATE_ORDER BETWEEN ? AND ?`, [fechaIni, fechaFin],
    async (err, result) => {
        if (result) {
            if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                var respuesta = []
                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    var detail = await this.getDetailByIdOrder(element.ORD_ID)
                    respuesta.push({ ...element, Productos: detail[0], totalPrecio: detail[1] })
                }
                res.status(200).send(respuesta);
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
);

exports.getDetailByIdOrder = async (req) => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT p.PRO_NAME,p.PRO_BARCODE, ROUND(od.ODT_SUBTOTAL,2) as PRO_PRICE FROM sv_order_details od,sv_product p WHERE od.ORD_ID=? AND p.PRO_ID=od.PRO_ID
            UNION ALL 
            SELECT p.PRO_NAME,p.PRO_BARCODE, p.PRO_PRICE FROM sv_product p WHERE p.PRO_ID=27;`, [req],
            (err, result) => {
                try {
                    if (result.length > 0) {
                        var productos = ""
                        var totalPrecio = 0
                        result.map((val) => {
                            productos += (val.PRO_NAME + "(" + val.PRO_BARCODE + ") S/." + val.PRO_PRICE + ";\n");
                            totalPrecio += val.PRO_PRICE
                        })
                        resolve([productos, totalPrecio]);
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

exports.readByCLientId = async (res, req) => await pool.query(
    "SELECT * FROM sv_orders where CLI_ID = ? ORDER BY ORD_ID ASC", [req],
    (err, result) => {
        if (result) {
            if (result.length == 0) {
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
        } else {
            res.json({
                message: err,
                status: err
            });
        }

    }
);

exports.getIfProductOut = async (req) => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT p.PRO_AGOTADO, p.PRO_NAME, p.PRO_PRICE, p.PRO_WEIGHT FROM sv_product p WHERE p.PRO_ID = ?;`, [req],
            (err, result) => {
                try {
                    if (result) {
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

exports.updateProductAgotado = async (agotado, req) => {
    return new Promise((resolve) => {
        pool.query(
            `UPDATE sv_product SET PRO_AGOTADO = ? WHERE PRO_ID = ?;`, [agotado, req],
            (err, result) => {
                try {
                    if (result) {
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

exports.updateProductNoAgotado = async (req) => {
    return new Promise((resolve) => {
        pool.query(
            `UPDATE sv_product SET PRO_AGOTADO = "1" WHERE PRO_ID IN (SELECT d.PRO_ID FROM sv_order_details d WHERE d.ORD_ID = ?);`, [req],
            (err, result) => {
                try {
                    if (result) {
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


exports.readByOrderId = async (res, req) => global.readByOne(res, order.name, order.name_table, 'ORD_ID', req)
exports.readOrderDetailByOrderID = async (res, req) => {
    await pool.query("CALL PR_ORDERDETAIL(?)", [req],
        (err, result) => {
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
    )
}
exports.updateOne = async (res, res_column, res_update) => global.update(res, order.name, order.name_table, res_column, 'ORD_ID', res_update);

exports.deleteOne = async (res, res_update) => global.delete(res, order.name, order.name_table, 'ORD_ID', res_update);
