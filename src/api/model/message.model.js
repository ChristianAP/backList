const { message } = require("../../lib/secret/key.secret");
const global = require("../../lib/globals/model.global");
const pool = require("../../connection/connection");

exports.create = async(req, res) => {
    global.create(res, message.name, message.name_table, req);
};

exports.read = async(res) => {
    global.read(res, message.name, message.name_table);
};

exports.readByOne = async(res, res_search) => {
    global.readByOne(res, message.name, message.name_table, "MSS_ID", res_search);
};

exports.readByTicket = async(res, res_search) => {
    await pool.query(
        "SELECT * FROM " + message.name_table + " WHERE TCK_ID = ? ORDER BY MSS_ID ASC", [res_search],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 200,
                });
            } else if (result.length == 0) {
                res.status(200).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                if (result.length == 0) {
                    res.status(404).json({
                        message: codes.code_404(message.name, "encontrado"),
                    });
                } else {
                    res.send(result);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(message.name, "buscar"),
                    err,
                });
            }
        }
    );
};

exports.updateOne = async(res, res_column, res_update) => {
    global.update(
        res,
        message.name,
        message.name_table,
        res_column,
        "MSS_ID",
        res_update
    );
};

exports.deleteOne = async(res, res_update) => {
    global.delete(res, message.name, message.name_table, "MSS_ID", res_update);
};