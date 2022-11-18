const pool = require("../../connection/connection");
const global = require("../../lib/globals/model.global");
const here = require("./person.model");
const { user_rol } = require("../../lib/secret/key.secret");

exports.create = async (req, res, leng, person) => {
    for (const rol in req.roles) {
        await pool.query(
            "INSERT INTO " + user_rol.name_table + " SET ?", [{
                USR_ID: req.USR_ID,
                ROL_ID: req.roles[rol],
                URO_STATUS: req.URO_STATUS,
            }],
            async (err, result) => {
                if (!err) {
                    if (rol == (leng - 1)) {
                        if (person) {
                            await this.UpdatePersonByUser(res, req.USR_ID, person.PER_ID)
                        } else {
                            res.status(200).json({
                                message: "creado Correctamente",
                                status: 200,
                            });
                        }
                    } else {
                        console.log("Registro exitoso.");
                    }

                } else {
                    res.status(500).json({
                        message: "No se encuentran alertas.",
                        status: 500,
                    });
                }
            }
        );

    }
};

exports.UpdatePersonByUser = async (res, iduser, idperson) => {
    await pool.query(
        "UPDATE sv_person SET USR_ID=? WHERE PER_ID=?;", [iduser, idperson], (err, result) => {
            if (!err) {
                res.status(200).json({
                    message: "No se encuentran registros",
                    status: 200,
                });
            }
            else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }

        }
    );
};

exports.read = async (res) => {
    global.read(res, user_rol.name, user_rol.name_table);
};

exports.readByOne = async (res, res_search) => {
    global.readByOne(
        res,
        user_rol.name,
        user_rol.name_table,
        "URO_ID",
        res_search
    );
};

exports.updateOne = async (res, res_column, res_update) => {
    global.update(
        res,
        user_rol.name,
        user_rol.name_table,
        res_column,
        "URO_ID",
        res_update
    );
};

exports.deleteOne = async (res, res_update) => {
    global.delete(res, user_rol.name, user_rol.name_table, "URO_ID", res_update);
};

exports.countClient = async (req, res) => {
    await pool.query(
        `SELECT * FROM sv_user_rol WHERE USR_ID = ${req.USR_ID} 
        AND ROL_ID = (SELECT ROL_ID FROM sv_rol WHERE ROL_NAME = 'CLIENTE')`,
        (err, result) => {
            if (result.length > 0) {
                if (result[0].URO_STATUS == "0") {
                    pool.query(
                        `UPDATE sv_user_rol SET URO_STATUS = 1 WHERE URO_ID = ${result[0].URO_ID}`,
                        (err) => {
                            if (err == null) {
                                pool.query(
                                    `UPDATE sv_person SET PER_CLIENT = 1 WHERE USR_ID = ${result[0].USR_ID}`,
                                    (err) => {
                                        if (err == null) {
                                            res.status(200).json({
                                                message: "Cuenta de Cliente activada",
                                                status: 200,
                                            });
                                        }
                                    }
                                );
                            } else {
                                res.status(200).json({
                                    message: "Cuenta de Cliente activada",
                                    status: 200,
                                });
                            }
                        }
                    );
                } else if (result[0].URO_STATUS == "1") {
                    pool.query(
                        `UPDATE sv_user_rol SET URO_STATUS = 0 WHERE URO_ID = ${result[0].URO_ID}`,
                        (err) => {
                            if (err == null) {
                                pool.query(
                                    `UPDATE sv_person SET PER_CLIENT = 0 WHERE USR_ID = ${result[0].USR_ID}`,
                                    (err) => {
                                        if (err == null) {
                                            res.status(200).json({
                                                message: "Cuenta de Cliente desactivada",
                                                status: 200,
                                            });
                                        }
                                    }
                                );
                            } else {
                                res.status(200).json({
                                    message: "Cuenta de Cliente activada",
                                    status: 200,
                                });
                            }
                        }
                    );
                }
            } else {
                pool.query(`INSERT INTO sv_user_rol SET `);
            }
        }
    );
};