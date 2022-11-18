const global = require('../../lib/globals/model.global');
const pool = require('../../connection/connection');
const { readRUC } = require('../external/sunat/sunat.model');
const { readDNI } = require('../external/reniec/reniec.model');
const { person, payment_method } = require('../../lib/secret/key.secret');
const provider = require('./provider.model');

exports.create = async (req, client, res) => {
    await pool.query(
        `INSERT INTO ${person.name_table} SET ?`, [req],
        (err, result) => {
            try {
                if (err === null && result.affectedRows > 0) {
                    client.PER_ID = result.insertId;
                    provider.create(client, res)
                } else {
                    throw err;
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

exports.createPerson = async (res, params) => {
    global.create(res, person.name, person.name_table, params);
};

exports.read = async (res) => {
    global.read(res, person.name, person.name_table);
};

exports.findByDni = async (res, res_search) => {
    await pool.query(
        `SELECT P.PER_ID, P.PMT_ID, PM.PMT_PRICE, P.PER_NAME, P.PER_LASTNAME, 
        P.PER_CLIENT, P.PER_DNI, P.PER_RUC, P.PER_EMAIL, P.PER_N_PHONE, 
        P.PER_TRADENAME, P.PER_DIRECTION, P.PER_DEPARTMENT, P.PER_PROVINCE, 
        P.PER_DISTRIC, P.PER_COUNTRY, P.PER_PHOTO,P.LCT_ID FROM ${person.name_table} AS P, 
        ${payment_method.name_table} AS PM WHERE P.PMT_ID = PM.PMT_ID AND P.PER_DNI = ?`, [res_search],
        (err, result) => {
            try {
                if (result.length > 0) {
                    result[0].PLATFORM = 'own'
                    res.status(200).json(result[0])
                } else {
                    readDNI(res, res_search)
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

exports.findByRuc = async (res, res_search) => {
    await pool.query(
        `SELECT P.PER_ID, P.PMT_ID, PM.PMT_PRICE, P.PER_NAME, P.PER_LASTNAME, 
        P.PER_CLIENT, P.PER_DNI, P.PER_RUC, P.PER_EMAIL, P.PER_N_PHONE, 
        P.PER_TRADENAME, P.PER_DIRECTION, P.PER_DEPARTMENT, P.PER_PROVINCE, 
        P.PER_DISTRIC, P.PER_COUNTRY, P.PER_PHOTO,P.LCT_ID FROM ${person.name_table} AS P, 
        ${payment_method.name_table} AS PM WHERE P.PMT_ID = PM.PMT_ID AND P.PER_RUC = ?`, [res_search],
        (err, result) => {
            try {
                if (result.length > 0) {
                    result[0].PLATFORM = 'own'
                    res.status(200).json(result[0])
                } else {
                    readRUC(res, res_search)
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

exports.readByOne = async (res, res_search) => {
    global.readByOne(res, person.name, person.name_table, "PER_ID", res_search);
};

exports.readUserByOne = async (res, res_search) => {
    global.readByOne(res, person.name, person.name_table, "USR_ID", res_search);
};

exports.deleteProveedor = async (res, res_update) => {
    await pool.query(
        'SELECT USR_ID FROM sv_person WHERE PER_ID = ?', [res_update],
        async (err, result) => {
            if (result.length == 0) {
                res.json({
                    message: 'No se encuentran registros',
                    status: 200,
                });
            } else if (err == null) {
                console.log("ESTE ES EL USR_ID DEL PROVEEDOR A ELIMINAR ...", result.USR_ID)
                if (result.USR_ID == undefined) {
                    await pool.query(
                        'DELETE FROM sv_client WHERE PER_ID = ?', [res_update],
                        async (err) => {
                            try {
                                if (err === null) {
                                    await pool.query(
                                        'DELETE FROM sv_person WHERE PER_ID = ? ', [res_update],
                                        (err) => {
                                            try {
                                                if (err === null) {
                                                    res.status(200).send({
                                                        message: 'PROVEEDOR ELIMINADO CORRECTAMENTE',
                                                        status: 200,
                                                    });
                                                }

                                            } catch (error) {
                                                res.status(500).json({
                                                    message: error,
                                                    status: 500,
                                                });

                                            }
                                        }
                                    );
                                }

                            } catch (error) {
                                res.status(500).json({
                                    message: error,
                                    status: 500,
                                });

                            }
                        }
                    );
                } else if (result.USR_ID !== undefined) {
                    await pool.query(
                        'DELETE FROM sv_user_rol WHERE USR_ID = ?', [result.USR_ID],
                        async (err) => {
                            try {
                                if (err === null) {
                                    await pool.query(
                                        'DELETE FROM sv_user WHERE USR_ID = ? ', [result.USR_ID],
                                        async (err) => {
                                            try {
                                                if (err === null) {
                                                    await pool.query(
                                                        'DELETE FROM sv_client WHERE PER_ID = ?', [res_update],
                                                        async (err) => {
                                                            try {
                                                                if (err === null) {
                                                                    await pool.query(
                                                                        'DELETE FROM sv_person WHERE PER_ID = ? ', [res_update],
                                                                        (err) => {
                                                                            try {
                                                                                if (err === null) {
                                                                                    res.status(200).send({
                                                                                        message: 'PROVEEDOR ELIMINADO CORRECTAMENTE',
                                                                                        status: 200,
                                                                                    });
                                                                                }
                                
                                                                            } catch (error) {
                                                                                res.status(500).json({
                                                                                    message: error,
                                                                                    status: 500,
                                                                                });
                                
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                
                                                            } catch (error) {
                                                                res.status(500).json({
                                                                    message: error,
                                                                    status: 500,
                                                                });
                                
                                                            }
                                                        }
                                                    );
                                                }

                                            } catch (error) {
                                                res.status(500).json({
                                                    message: error,
                                                    status: 500,
                                                });

                                            }
                                        }
                                    );
                                }

                            } catch (error) {
                                res.status(500).json({
                                    message: error,
                                    status: 500,
                                });

                            }
                        }
                    );
                }
            } else {
                res.json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.deleteOne = async (res, res_update) => {
    await pool.query(
        'CALL PR_DELETE_CLIENT(?) ', [res_update],
        (err) => {
            try {
                if (err === null) {
                    res.status(200).send({
                        message: 'Actualizado correctamente',
                        status: 200,
                    });
                }

            } catch (error) {
                res.status(500).json({
                    message: error,
                    status: 500,
                });

            }
        }
    );
};

exports.updateOne = async (res, res_column, res_update) => {
    global.update(
        res,
        person.name,
        person.name_table,
        res_update['values'],
        'PER_ID',
        res_column
    );
};
exports.updateOneTienda = async (res, res_column, res_update) => {
    global.update(
        res,
        person.name,
        person.name_table,
        res_update,
        'PER_ID',
        res_column
    );
};

exports.updateOneForUSer = async (res, res_column, res_update) => {
    global.update(
        res,
        person.name,
        person.name_table,
        res_column['values'],
        'PER_ID',
        res_update
    );
};

exports.readforticket = async (res) => {
    await pool.query(
        'SELECT PER_ID, PER_NAME FROM ' + person.name_table,
        (err, result) => {
            if (result.length == 0) {
                res.json({
                    message: 'No se encuentran registros',
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

exports.readforDNI = async (res, identidad) => {
    await pool.query(
        `SELECT PMT_ID FROM ${person.name_table} p WHERE (p.PER_DNI=${identidad} OR p.PER_RUC=${identidad})`,
        (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.json({
                        message: "No se encuentran registros",
                        status: 200,
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
                    message: err,
                    status: 500,
                });

            }
        }
    );
};

exports.oneDataPerson = async (perId) => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT CONCAT(PER_NAME, ' ', PER_LASTNAME) AS PERSON FROM ${person.name_table} WHERE PER_ID = ?`, [perId],
            (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        console.log(err);
                    } else if (rows.length != 0) {
                        resolve(rows[0]['PERSON']);
                    } else if (rows.length == 0) {
                        console.log(err);
                    }
                } else {
                    console.log(err);
                }
            }
        );
    });
};

exports.createRolConductor = async (res, PER_ID) => {
    // console.log(req)
    await pool.query("SELECT USR_ID FROM sv_person WHERE PER_ID = ?", [PER_ID], async (err, result) => {
        if (err == null) {
            if (result) {
                await pool.query(
                    "INSERT INTO sv_user_rol(USR_ID, ROL_ID,URO_STATUS) VALUES(?,?,?)", [result[0].USR_ID, '13', '1'],
                    (err, result) => {
                        if (err == null) {
                            if (result) {
                                res.json({
                                    message: "Placa y Licensia actualizados correctamente!!",
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
    })




};

exports.updateConductor = async (res, req) => {
    console.log(req)
    await pool.query(
        "UPDATE sv_person p SET p.PER_PLATE= ?, p.PER_LICENSE= ? WHERE p.PER_ID= ?", [req.PER_PLATE, req.PER_LICENSE, req.PER_ID],
        (err, result) => {
            if (err == null) {
                if (result) {
                    res.json({
                        message: "Placa y Licensia actualizados correctamente!!",
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

exports.deleteRolConductor = async (res, req) => {
    // console.log(req)
    await pool.query(
        "DELETE FROM sv_user_rol WHERE USR_ID = ? AND ROL_ID = ?", [req.USR_ID, req.ROL_ID],
        async (err, result) => {
            if (err == null) {
                if (result) {
                    await pool.query(
                        "UPDATE sv_person SET PER_PLATE = ? , PER_LICENSE = ? WHERE PER_ID = ?", [null, null, req.PER_ID],
                        (err, result) => {
                            if (err == null) {
                                if (result) {
                                    res.json({
                                        message: "REGISTRO ACTUALIZADO CORRECTAMENTE",
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

exports.oneDataClientePerson = async (cliId) => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT CONCAT(P.PER_NAME, ' ', P.PER_LASTNAME) AS PERSON FROM ${person.name_table} AS P WHERE P.USR_ID = ?`, [cliId],
            (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        console.log(err);
                    } else if (rows.length != 0) {
                        resolve(rows[0]['PERSON']);
                    } else if (rows.length == 0) {
                        console.log(err);
                    }
                } else {
                    console.log(err);
                }
            }
        );
    });
};

exports.readPersonByDocument = async (res, idClient) => {
    await pool.query(
        `SELECT P.PER_ID AS IDPERSON, CONCAT(P.PER_NAME, ' ', P.PER_LASTNAME) AS NOMBRE, P.PER_DNI AS DNI, P.PER_RUC AS RUC, 
        P.PER_TRADENAME AS TRADENAME, P.PER_DIRECTION AS DIRECTION
        FROM ${person.name_table} AS P WHERE P.PER_ID = ? AND P.PER_STATUS = 1 ;`, [idClient],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: 'Error de servidor: ' + err,
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: 'No se encuentran registros',
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
    const search = `SELECT P.PER_ID, P.PER_NAME, P.PER_LASTNAME, P.PER_RUC, P.PER_DNI, P.PER_TRADENAME, P.PER_DIRECTION, P.LCT_ID, P.PMT_ID, PM.PMT_PRICE
    FROM ${person.name_table} AS P INNER JOIN ${payment_method.name_table} AS PM ON PM.PMT_ID = P.PMT_ID WHERE PER_NAME LIKE '%${res_search}%' 
    OR PER_LASTNAME LIKE '%${res_search}%' OR PER_TRADENAME LIKE '%${res_search}%'`;

    const nosearch = `SELECT P.PER_ID, P.PER_NAME, P.PER_LASTNAME, P.PER_RUC, P.PER_DNI, P.PER_TRADENAME, P.PER_DIRECTION, P.LCT_ID, P.PMT_ID, PM.PMT_PRICE
    FROM ${person.name_table} AS P, ${payment_method.name_table} AS PM WHERE P.PMT_ID = PM.PMT_ID AND P.PER_STATUS = 1 LIMIT 5;`;

    await pool.query(res_search == 'no' ? nosearch : search,
        (err, result) => {
            try {
                if (result[0] !== undefined || result.length > 0) {
                    res.status(200).json(result);
                } else {
                    throw { status: 404, message: 'No se encontraron registros' };
                }
            } catch (error) {
                res.status(error ? error.status : 500).json({
                    message: err ? err : error.message,
                    status: error ? error.status : 500,
                });
            }
        }
    );
};

exports.readConductor = async (res) => {
    await pool.query(
        `SELECT p.PER_ID, p.PER_NAME, p.PER_LASTNAME, p.PER_TRADENAME, p.PER_DNI, p.PER_LICENSE, p.PER_PLATE ,p.USR_ID,  r.ROL_ID, r.ROL_NAME
        FROM sv_person p, sv_rol r, sv_user u,sv_user_rol ur 
        WHERE ur.USR_ID = u.USR_ID and ur.ROL_ID = r.ROL_ID and p.USR_ID = u.USR_ID and r.ROL_ID = '13'`,
        (err, result) => {
            if (result.length == 0) {
                res.json({
                    message: 'No se encuentran registros',
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
