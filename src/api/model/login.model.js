require('dotenv').config();

const mysqlConnection = require("../../connection/connection");
const { checkEncode } = require("../../lib/middleware/mask.middleware");
const jwt = require("jsonwebtoken");
const { sendEmailCodigo } = require('./send_email.model');
const { result } = require('lodash');

exports.login = async (user, psscode, res) => {
    const getUser = await checkPass(user, psscode, res);
    var clientUserData;
    if (getUser == 0) {
        res.status(401).json({ message: "Usuario Desconocido", status: 401 });
    } else if (getUser == 1) {
        res.status(401).json({ message: "Usuario Bloqueado", status: 401 });
    } else if (getUser == 2) {
        res.status(500).json({ message: "Error interno de servidor", status: 500 });
    } else {
        //nuevo
        const roles = await getRoles(getUser, res);
        if (roles[0].ROL_NAME == "CLIENTE" && roles.length == 1) {
            access = '';
            clientUserData = await getClientData(getUser, res);
        } else {

            const query = await getUserAccess(getUser, res)

            access = query[0].map(val => {
                return {
                    Acceso: val.parent_name,
                    Ruta: val.parent_url
                }
            }).filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.Acceso === thing.Acceso && t.Ruta === thing.Ruta
                ))).map(myVal => {
                    let object = {
                        ...myVal,
                        SubAccesos: query[0].filter(val => val.parent_name === myVal.Acceso).map(
                            subVal => {
                                return {
                                    nombre: subVal.ACC_NAME,
                                    ruta: subVal.ACC_URL
                                }
                            }
                        )
                    }
                    return object;
                })
        }

        // let data = JSON.stringify(psscode);
        const iu = await getUser;
        if (clientUserData && clientUserData[0]["0"]) {
            const token = jwt.sign({ USR_ID: getUser, ...clientUserData[0]["0"] }, process.env.TOKEN_KEY, { expiresIn: 180 * 24 * 60 * 60 * 1000 });
            res.status(200).cookie('clientToken', token, {
                sameSite: true,
                path: '/',
                expires: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000),
            })
                .json({ iu: iu, user, roles, accesos: access });
        } else {
            const token = jwt.sign({ USR_ID: getUser }, process.env.TOKEN_KEY, { expiresIn: 180 * 24 * 60 * 60 * 1000 });
            res.status(200).cookie('token', token, {
                sameSite: true,
                path: '/',
                expires: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000),
            })
                .json({ iu: iu, user, roles, accesos: access });
        }
    }
};

exports.loginWithDni = async (idUser, res) => {
    const user = await getUserById(idUser, res)
    var clientUserData;

    //nuevo
    const roles = await getRoles(idUser, res);
    if (roles[0].ROL_NAME == "CLIENTE" && roles.length == 1) {
        access = '';
        clientUserData = await getClientData(idUser, res);
    } else {

        const query = await getUserAccess(idUser, res)

        access = query[0].map(val => {
            return {
                Acceso: val.parent_name,
                Ruta: val.parent_url
            }
        }).filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.Acceso === thing.Acceso && t.Ruta === thing.Ruta
            ))).map(myVal => {
                let object = {
                    ...myVal,
                    SubAccesos: query[0].filter(val => val.parent_name === myVal.Acceso).map(
                        subVal => {
                            return {
                                nombre: subVal.ACC_NAME,
                                ruta: subVal.ACC_URL
                            }
                        }
                    )
                }
                return object;
            })
    }

    // let data = JSON.stringify(psscode);
    const iu = idUser
    if (clientUserData && clientUserData[0]["0"]) {
        const token = jwt.sign({ USR_ID: iu, ...clientUserData[0]["0"] }, process.env.TOKEN_KEY, { expiresIn: 180 * 24 * 60 * 60 * 1000 });
        res.status(200).cookie('token', token, {
            sameSite: true,
            path: '/',
            expires: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000),
        })
            .json({ iu: iu, user, roles, accesos: access });
    } else {
        const token = jwt.sign({ USR_ID: iu }, process.env.TOKEN_KEY, { expiresIn: 180 * 24 * 60 * 60 * 1000 });
        res.status(200).cookie('token', token, {
            sameSite: true,
            path: '/',
            expires: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000),
        })
            .json({ iu: iu, user, roles, accesos: access });
    }
};

const checkPass = async (user, psscode, res) => {
    return new Promise((resolve) => {
        mysqlConnection.query(
            "SELECT USR_ID, USR_PASSWORD, USR_STATUS FROM sv_user WHERE USR_USER = ?", [user],
            (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        resolve(0);
                    } else if (rows[0]["USR_STATUS"] != 0) {
                        let check = checkEncode(psscode, rows[0]["USR_PASSWORD"]);
                        check == false ?
                            res
                                .status(401)
                                .json({ message: "Contraseña incorrecta", status: 401 }) :
                            resolve(rows[0]["USR_ID"]);
                    } else if (rows[0]["USR_STATUS"] == 0) {
                        resolve(1);
                    }
                } else {
                    resolve(2);
                }
            }
        );
    });
};

const getUserById = async (userId, res) => {
    return new Promise((resolve) => {
        mysqlConnection.query(
            "SELECT USR_USER FROM sv_user WHERE USR_ID=?", [userId],
            (err, rows) => {
                if (!err) {
                    rows.length == 0 ?
                        res.status(400).json({
                            message: "No se encontró al usuario",
                            status: 400,
                        }) :
                        resolve(rows);
                } else {
                    res.status(500).json({ message: "Error interno de servidor al regresar el usuario", status: 500 });
                }
            }
        )
    })
}

const getRoles = async (getpass, res) => {
    return new Promise((resolve) => {
        mysqlConnection.query(
            "SELECT ROL.ROL_NAME FROM sv_rol AS ROL, sv_user_rol AS URO WHERE URO.ROL_ID = ROL.ROL_ID AND URO.USR_ID = ? AND URO_STATUS = 1", [getpass],
            (err, rows) => {
                if (!err) {
                    rows.length == 0 ?
                        res.status(400).json({
                            message: "No se encontraron roles asignados al usuario",
                            status: 400,
                        }) :
                        resolve(rows);
                } else {
                    res
                        .status(500)
                        .json({ message: "Error interno de servidor al regresar los roles", status: 500 });
                }
            }
        );
    });
};

const getAccess = async (getpass, res) => {
    return new Promise((resolve) => {
        mysqlConnection.query(
            "SELECT ACC.ACC_NAME, ACC.ACC_URL FROM sv_access AS ACC, sv_user_access AS UAC WHERE UAC.ACC_ID = ACC.ACC_ID AND UAC.USR_ID = ?", [getpass],
            (err, rows) => {
                if (!err) {
                    rows.length == 0 ?
                        res.status(400).json({
                            message: "No se encontraron accesos registrados al usuario",
                            status: 400,
                        }) :
                        resolve(rows);
                } else {
                    res
                        .status(500)
                        .json({ message: "Error interno de servidor al regresar los accesos", status: 500 });
                }
            }
        );
    });
};

const getUserAccess = async (getpass, res) => {
    return new Promise((resolve) => {
        mysqlConnection.query(
            'CALL PR_GET_ACCESS(?)', [getpass],
            (err, rows) => {
                if (!err) {
                    rows.length == 0 ?
                        res.status(400).json({
                            message: "No se encontraron accesos registrados al usuario",
                            status: 400,
                        }) :
                        resolve(rows);
                } else {
                    res
                        .status(500)
                        .json({ message: "Error interno de servidor al regresar los accesos", status: 500 });
                }
            }
        )
    })
}

//Info si es Cliente
const getClientData = async (getpass, res) => {
    return new Promise((resolve) => {
        mysqlConnection.query(
            'CALL PR_GETCLIENTDATA(?)', [getpass],
            (err, rows) => {
                if (!err) {
                    rows.length == 0 ?
                        res.status(400).json({
                            message: "No se encontraron accesos registrados al usuario",
                            status: 400,
                        }) :
                        resolve(rows);
                } else {
                    res
                        .status(500)
                        .json({ message: "Error interno de servidor al regresar los accesos", status: 500 });
                }
            }
        )
    })
}
exports.CreateCode = async (res, correo, usuario) => {
    var codigo = Math.round(Math.random() * 999999);
    await mysqlConnection.query(

        `UPDATE sv_user u SET u.USR_CODE = ? WHERE u.USR_USER= ? AND u.USR_ID IN (select p.USR_ID FROM sv_person p where p.PER_EMAIL= ?)`, [codigo, usuario, correo],
        (err, result) => {
            if (err == null) {
                if (result) {
                    console.log(result)
                    if (result.affectedRows > 0) {
                        sendEmailCodigo(res, { correo, usuario, codigo })
                    }
                    else {
                        res.status(500).json({
                            message: "correo o usuario incorrecto",
                            status: 500,
                        });
                    }

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
exports.ValidateCode = async (res, user, correo, code) => {
    console.log(user, correo,code)
    await mysqlConnection.query(
        `select * from sv_user u WHERE u.USR_USER= ? AND u.USR_CODE= ? AND u.USR_ID IN (select p.USR_ID FROM sv_person p where p.PER_EMAIL= ?)
        `, [user,code,correo],
        (err, result) => {
            try {
                if (result.length > 0) {
                    result.PLATFORM = 'own'
                    res.status(200).json(result)
                } else {
                    res.status(404).json({
                        message : "no se encuentra resultado",
                        status : 404
                    })
                }
            } catch (error) {
                res.status(500).json({
                    message: err ? err : error,
                    status: 500,
                });
            }
        }
    );
};