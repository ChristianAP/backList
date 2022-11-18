const global = require("../../lib/globals/model.global");
const pool = require("../../connection/connection");
const { status_ticket } = require("../../lib/secret/key.secret");

exports.create = async(req, res) => { global.create(res, status_ticket.name, status_ticket.name_table, req); }
exports.read = async(res) => { global.read(res, status_ticket.name, status_ticket.name_table); }
exports.readByOne = async(res, res_search) => {
    global.readByOne(
        res,
        status_ticket.name,
        status_ticket.name_table,
        "STC_ID",
        res_search
    );
}
exports.updateOne = async(res, res_column, res_update) => {
    global.update(
        res,
        status_ticket.name,
        status_ticket.name_table,
        res_column,
        "STC_ID",
        res_update
    );
}
exports.deleteOne = async(res, res_update) => {
    global.delete(
        res,
        status_ticket.name,
        status_ticket.name_table,
        "STC_ID",
        res_update
    );
}

exports.status = async(res) => {
    await pool.query(
        "SELECT STC_ID, STC_NAME, STC_DESCRIPTION FROM " + status_ticket.name_table,
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(200).json({
                    message: "No se encuentran registros",
                    status: 200,
                });
            } else if (err == null) {
                res.send(result);
            } else {
                res.json({
                    message: err.code,
                    status: err.errno,
                });
            }
        }
    );
};