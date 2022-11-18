const global = require("../../lib/globals/model.global");
const { client } = require("../../lib/secret/key.secret");
const pool = require("../../connection/connection");

exports.read = async(res) => {
    global.read(res, client.name, client.name_table);
};

exports.create = async(req, res) => {
    global.create(res, client.name, client.name_table, req);
};

exports.updateOne = async(res, res_column, res_update) => {
    global.update(
        res,
        client.name,
        client.name_table,
        res_update,
        "CLI_ID",
        res_column
    );
};

exports.deleteOne = async(res, res_delete) => {
    global.delete(res, client.name, client.name_table, "CLI_ID", res_delete);
};

exports.readByOne = async(res, res_search) => {
    await pool.query("CALL PR_ONECLIENT(?)", [res_search], (err, result) => {
        try {
            if (result.length == 0) {
                res.status(200).json({
                    message: "No se encuentran el cliente",
                    status: 200,
                });
            } else if (err == null) {
                res.status(200).send(result[0]);
            }
        } catch (error) {
            res.status(500).json({
                message: error,
                status: 500,
            });
        }
    });
};

exports.readClient = async(res) => {
    await pool.query("CALL PR_ALLCLIENTS()", (err, result) => {
        if (result === undefined || result.length == 0) {
            res.status(404).json({
                message: "No se encuentran clientes",
                status: 404,
            });
        } else if (err == null) {
            res.status(200).send(result[0]);
        } else {
            res.status(500).json({
                message: err,
                status: 500,
            });
        }
    });
};

exports.readWorker = async(res) => {
    await pool.query("CALL PR_ALLWORKERS()", (err, result) => {
        if (result === undefined || result.length == 0) {
            res.status(404).json({
                message: "No se encuentran clientes",
                status: 404,
            });
        } else if (err == null) {
            res.status(200).send(result[0]);
        } else {
            res.status(500).json({
                message: err,
                status: 500,
            });
        }
    });
};

exports.readClientDetail = async(res, id) => {
    await pool.query(
        "SELECT CL.CLI_ID, US.USR_USER, US.USR_PASSWORD, PE.* " +
        "FROM sv_client AS CL,sv_person AS PE, sv_user AS US WHERE CL.PER_ID=PE.PER_ID AND US.USR_ID=PE.USR_ID AND PE.PER_ID=? ; ", [id], (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    res.status(200).send(result[0]);
                } else {
                    res.status(500).json({
                        message: err,
                        status: 500,
                    });
                }
            }
        }
    );
};