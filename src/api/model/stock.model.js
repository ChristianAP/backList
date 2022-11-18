const { dateForOperationsInDB } = require("../../lib/globals/date.global");
const global = require("../../lib/globals/model.global");
const pool = require("../../connection/connection");
const { stock } = require("../../lib/secret/key.secret");

exports.create = async (req, res) => {
    global.create(res, stock.name, stock.name_table, req);
};

exports.createfromaddproduct = async (req, res, listIds) => {
    const DATE_UPGRADE = await dateForOperationsInDB();
    const listofstock = await readStocks(res, listIds);

    for (const product in req) {
        const result =
            listofstock === undefined || listofstock.length === 0 ?
                0 :
                await listofstock.find(
                    (element) => element.PRO_ID == req[product]["ID"]
                );

        if (result === 0 || result === undefined) {
            const prod = {
                PRO_ID: req[product]["ID"],
                STK_INITIAL_STOCK: Number(req[product]["CANTIDAD"]),
                STK_TODAY: Number(req[product]["CANTIDAD"]),
                STK_DATE_UPGRADE: DATE_UPGRADE,
                STK_STATUS: "1",
            };
            await pool.query(
                `INSERT INTO ${stock.name_table} SET ?`, [prod],
                (err) => {
                    if (err) {
                        res.json({ message: err.message, error: err, status: 500 });
                    }
                }
            );
        } else if (result != 0) {
            const prod = {
                // PRO_ID: req[product]["ID"],
                STK_INITIAL_STOCK: Number(result.STK_TODAY) + Number(req[product]["CANTIDAD"]),
                STK_TODAY: Number(result.STK_TODAY) + Number(req[product]["CANTIDAD"]),
                STK_DATE_UPGRADE: DATE_UPGRADE,
                STK_STATUS: "1",
            };
            await pool.query(
                `UPDATE ${stock.name_table}  SET ? WHERE STK_ID = ?`, [prod, result.STK_ID],
                (err) => {
                    if (err) {
                        res.json({ message: err.message, error: err, status: 500 });
                    }
                }
            );
        }
    }
    res.status(200).json({ message: "Nuevo stock de los productos, registrado exitosamente. ", status: 200 });
};

const readStocks = async (res, list_id) => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT PRO_ID, STK_ID, STK_INITIAL_STOCK, STK_TODAY FROM ${stock.name_table} WHERE PRO_ID IN (${list_id}) AND STK_STATUS = 1 ORDER BY STK_DATE_UPGRADE DESC`,
            (err, result) => {
                if (err) {
                    res.json({ message: err.message, status: 500 });
                } else if (result == undefined || result.length === 0) {
                    resolve(result);
                } else if (!err) {
                    resolve(result);
                }
            }
        );
    });
};

exports.readStockByProduct = async (res, list_id) => {
    pool.query(
        `SELECT s.* FROM sv_stock s, sv_product p WHERE s.PRO_ID = p.PRO_ID AND p.PRO_ID=?;`,
        [list_id], (err, result) => {
            if (err) {
                res.json({ message: err.message, status: 500 });
            } else if (result == undefined || result.length === 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (!err) {
                res.json(result[0]);
            }
        }
    );
};

exports.stockDetailByStockId = async (res, list_id) => {
    pool.query(
        `SELECT sd.* FROM sv_stock s, sv_stock_details sd WHERE s.STK_ID=sd.STK_ID AND s.STK_ID=? ORDER BY STD_ID DESC;`,
        [list_id], (err, result) => {
            if (err) {
                res.json({ message: err.message, status: 500 });
            } else if (result == undefined || result.length === 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (!err) {
                res.json(result);
            }
        }
    );
};

exports.read = async (res) => {
    global.read(res, stock.name, stock.name_table);
};
exports.readByOne = async (res, res_search) => {
    global.readByOne(res, stock.name, stock.name_table, "STK_ID", res_search);
};
exports.updateOne = async (res, res_column, res_update) => {
    global.update(
        res,
        stock.name,
        stock.name_table,
        res_column,
        "STK_ID",
        res_update
    );
};
exports.deleteOne = async (res, res_update) => {
    global.delete(res, stock.name, stock.name_table, "STK_ID", res_update);
};