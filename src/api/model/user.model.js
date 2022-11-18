const global = require("../../lib/globals/model.global");
const { user } = require("../../lib/secret/key.secret");
const pool = require("../../connection/connection");
const { checkEncode } = require("../../lib/middleware/mask.middleware");
exports.create = async (req, res) => {
    global.create(res, user.name, user.name_table, req);
};

exports.read = async (res) => {
    global.read(res, user.name, user.name_table);
};

exports.readByOne = async (res, res_search) => {
    global.readByOne(res, user.name, user.name_table, "USR_ID", res_search);
};

exports.validateUser = async (res_search, res) => {
    await pool.query(
        `SELECT EXISTS(
            SELECT *
            FROM sv_user u
            WHERE u.USR_USER = ?) AS utlizado`,
        [res_search],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(200).json({
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
        }
    );
};

exports.searchPerson = async (res, res_search) => {
    await pool.query(
        "SELECT PER_ID, CONCAT(PER_NAME, ' ', PER_LASTNAME) AS PERSON, PER_DNI, PER_TRADENAME, PER_RUC FROM sv_person WHERE PER_NAME LIKE ? OR PER_LASTNAME LIKE ? OR PER_DNI LIKE ? OR PER_TRADENAME LIKE ? OR PER_RUC LIKE ? AND PER_STATUS = '1'", [
            "%" + res_search + "%",
            "%" + res_search + "%",
            "%" + res_search + "%",
            "%" + res_search + "%",
            "%" + res_search + "%",
            "%" + res_search + "%",
    ],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(200).json({
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
};

exports.searchDriver = async (res, res_search) => {
    await pool.query(
        "SELECT PER_ID, CONCAT(PER_NAME, ' ', PER_LASTNAME) AS PERSON, PER_DNI, PER_TRADENAME, PER_RUC FROM sv_person WHERE PER_PERSONAL = '1' AND (SELECT PER_NAME LIKE ? OR PER_LASTNAME LIKE ? OR PER_DNI LIKE ? OR PER_TRADENAME LIKE ? OR PER_RUC LIKE ? AND PER_STATUS = '0' AND PER_PERSONAL = '1')", [
        "%" + res_search + "%",
        "%" + res_search + "%",
        "%" + res_search + "%",
        "%" + res_search + "%",
        "%" + res_search + "%",
    ],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(200).json({
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
};

exports.updateOne = async (res, res_column, res_update) => {
    global.update(
        res,
        user.name,
        user.name_table,
        res_column,
        "USR_ID",
        res_update
    );
};

exports.deleteOne = async (res, res_delete) => {
    global.delete(res, user.name, user.name_table, "USR_ID", res_delete);
};

exports.readForTicket = async (res) => {
    await pool.query(
        "SELECT US.USR_ID, US.USR_USER FROM " +
        user.name_table +
        " AS US, sv_user_rol AS UR WHERE US.USR_ID = UR.USR_ID AND UR.ROL_ID <> 4 AND US.USR_STATUS = 1 ORDER BY US.USR_ID ASC;",
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
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readClientsAndVendors = async (res, identifier) => {
    await pool.query(
        `SELECT US.USR_ID AS ID, US.USR_USER AS USUARIO, CONCAT(PE.PER_NAME, ' ', PE.PER_LASTNAME) AS NOMBRES, RL.ROL_NAME AS ROL, US.USR_STATUS AS ESTADO
    FROM sv_user_rol AS UR, sv_user AS US, sv_rol AS RL, sv_person AS PE WHERE UR.USR_ID = US.USR_ID AND PE.USR_ID = US.USR_ID AND UR.ROL_ID = RL.ROL_ID`,
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
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.changePassword = async (res, req, iduser) => {
    await pool.query(
        "select * from sv_user where USR_ID = ?", [iduser],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor" + err,
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(200).json({
                    message: "Contraseña incorrecta",
                    status: 404,
                });
            } else if (err == null) {
                let check = checkEncode(req.USR_PASSWORD, result[0]["USR_PASSWORD"]);
                check ?
                    pool.query("CALL PR_CHAGEPASSWORD(?,?)", [req.USR_PASSWORD2, iduser], (err, result) => {
                        if (result === undefined) {
                            res.status(500).json({
                                message: "Error de servidor" + err,
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
                                message: err,
                                status: 500,
                            });
                        }
                    }) : res.status(500).json({
                        message: "Contraseña incorrecta",
                        status: 500,
                    });
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );

};
exports.forgotPassword = async (res, req) => {
    console.log(req)
    await pool.query(
        "UPDATE sv_user u SET u.USR_PASSWORD= ? WHERE u.USR_USER= ?", [req.password, req.usuario],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "contraseña cambiada",
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