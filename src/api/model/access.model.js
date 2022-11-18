const global = require('../../lib/globals/model.global');
const { access } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.create = async (req, res) => global.create(res, access.name, access.name_table, req);
exports.read = async (res) => global.read(res, access.name, access.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, access.name, access.name_table, 'ACC_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, access.name, access.name_table, res_column, 'ACC_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, access.name, access.name_table, 'ACC_ID', res_update);

exports.getRolAccess = async (role_id, res) => {

    const all = await this.AllAccess(res, role_id)

    await pool.query(
        'CALL PR_GET_ACCESS_BY_ROLE(?)', [role_id],
        async (err, result) => {
            if (!err) {
                if (result[0].length === 0 && all.length === 0) {
                    res.status(404).json({
                        message: "No se encontraron accesos registrados al rol",
                        status: 400,
                    })

                } else {

                    let result_concat = result[0].concat(all[0])

                    let access = result_concat.map(val => {
                        return {
                            Acceso: val.parent_name,
                        }
                    }).filter((thing, index, self) =>
                        index === self.findIndex((t) => (
                            t.Acceso === thing.Acceso
                        ))).map(myVal => {
                            let object = {
                                ...myVal,
                                SubAccesos: result_concat.filter(val => val.parent_name === myVal.Acceso).map(
                                    subVal => {
                                        return {
                                            id: subVal.ACCESS_ID,
                                            nombre: subVal.ACC_NAME,
                                            descripcion: subVal.ACC_DESCRIPTION,
                                            estado: subVal.ARO_STATUS
                                        }
                                    }
                                )
                            }
                            return object;
                        })

                    res.status(200).json(access)
                }
            } else {
                res.status(500).json({ message: "Error interno de servidor al regresar los accesos", status: 500 });
            }
        }
    )

}

exports.AllAccess = async (res, idrole) => {
    return new Promise((resolve) => {
        pool.query(
            'CALL PR_GET_ACCESS_MISSING(?)', [idrole],
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

exports.accesTiendaCompartida = async(res, req) => {
    await pool.query(
        "select ar.ROL_ID, ar.ARO_STATUS, ar.ACC_ID from sv_access_rol ar, sv_access a where ar.ACC_ID = a.ACC_ID and ar.ACC_ID= ?", [req.ACC_ID],
        (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    // res.status(200).send(result);
                    result.map(async e => {
                        await pool.query(
                            "UPDATE sv_access_rol SET ARO_STATUS = ? WHERE ROL_ID = ? AND ACC_ID = ?", [req.STATUS, e.ROL_ID, e.ACC_ID]
                            // ,
                            // (err, result) => {
                            //     if (err == null) {
                            //         if (result) {
                            //             res.json({
                            //                 message: "ESTADO DE METODO DE PAGO ACTUALIZADO CORRECTAMENTE",
                            //                 status: 200,
                            //             });
                            //         } else {
                            //             res.status(500).json({
                            //                 message: err,
                            //                 status: 500,
                            //             });
                            //         }
                            //     } else {
                            //         res.status(500).json({
                            //             message: err,
                            //             status: 500,
                            //         });
                            //     }
                            // }
                            )
                    })
                } else {
                    res.status(500).json({
                        message: err,
                        status: 500,
                    });
                }
            }
        }
    );
}

