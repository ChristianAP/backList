const pool = require("../../connection/connection");
const codes = require("../responses/res.response");
const jwt = require("jsonwebtoken");

// [CREATE]
exports.create = async(res, name, table_name, create_params) => {

    await pool.query(
        "INSERT INTO " + table_name + " SET ?", [create_params],
        (err, result) => {

            if (err || result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    error: err,
                    status: 500,
                });
            } else{
                const lastId = result.insertId;
                res.json({
                    message: codes.code_200(name, "creado"),
                    status: 200,
                    data: lastId,
                });
            }
        }
    );
};

// [GET ALL]
exports.read = async(res, name, table_name) => {

    await pool.query("SELECT * FROM " + table_name, (err, result) => {
        try {
            res.send(result);
        } catch (error) {
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
            } else {
                res.status(500).json({
                    message: "Error de servidor",
                    error: err,
                    status: 500,
                });
            }
        }
    });
};

// [GET ID, NAME AND DESCRIPTION ONLY]
exports.IND = async(res, name, table_name, prefix) => {

    await pool.query(
        "SELECT " +
        prefix +
        "_ID, " +
        prefix +
        "_NAME, " +
        prefix +
        "_DESCRIPTION FROM " +
        table_name,
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
                res.send(result);
            } else {
                res.status(500).json({
                    message: "Error de servidor",
                    error: err,
                    status: 500,
                });
            }
        }
    );
};

// [GET ONE]
exports.readByOne = async(
    res,
    name,
    table_name,
    parameter_condition,
    value_condition
) => {

    await pool.query(
        "SELECT * FROM " + table_name + " WHERE " + parameter_condition + " = ?", [value_condition],
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
                        message: codes.code_404(name, "encontrado"),
                        status: 404,
                    });
                } else {
                    res.send(result[0]);
                }
            } else {
                res.status(500).json({
                    message: codes.code_500(name, "buscar"),
                    error: err,
                    status: 500,
                });
            }
        }
    );
};

// [EDIT ONE]
exports.update = async(
    res,
    name,
    table_name,
    columns_update,
    parameter_condition,
    value_condition
) => {

    await pool.query(
        "UPDATE " + table_name + " SET ? WHERE " + parameter_condition + " = ?", [columns_update, value_condition],
        (err) => {
            if (err === null) {
                res.status(200).json({
                    message: codes.code_201(name, "actualizado"),
                    status: 200,
                });
            } else {
                res.status(500).json({
                    message: codes.code_500(name, "actualizar"),
                    error: err,
                    status: 500,
                });
            }
        }
    );
};

// [DELETE]
exports.delete = async(
    res,
    name,
    table_name,
    parameter_condition,
    value_condition
) => {

    await pool.query(
        "DELETE FROM " + table_name + " WHERE " + parameter_condition + " = ?", [value_condition],
        (err, result) => {
            if (err == null) {
                res.status(200).json({
                    message: codes.code_200(name, "eliminado"),
                    status: 200
                });
            } else {
                if (err.errno == 1451) {
                    res.status(200).json({
                        message: "Error de foren key",
                        code: err.errno,
                        status: 200
                    });
                } else {
                    res.status(500).json({
                        message: codes.code_500(name, "eliminar"),
                        error: err,
                        status: 500
                    });
                }
            }
        }
    );
};