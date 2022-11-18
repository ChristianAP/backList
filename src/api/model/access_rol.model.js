const global = require('../../lib/globals/model.global');
const { access_rol } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.create = async (req, res) => {
    global.create(res, access_rol.name, access_rol.name_table, req);
}
// exports.read = async (res) => global.read(res, access_rol.name, access_rol.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, access_rol.name, access_rol.name_table, 'ARO_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, access_rol.name, access_rol.name_table, res_column, 'ARO_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, access_rol.name, access_rol.name_table, 'ARO_ID', res_update);

exports.getAllRolAccess = async (res) => {

    await pool.query(
        'CALL PR_GET_ACCESS_ALL()',
        async (err, result) => {
            if (!err) {
                if (result[0].length == 0) {
                    res.status(404).json({
                        message: "No se encontraron accesos registrados al rol",
                        status: 400,
                    })

                } else {
                    let access = result[0].map(val => {
                        return {
                            Acceso: val.parent_name,
                        }
                    }).filter((thing, index, self) =>
                        index === self.findIndex((t) => (
                            t.Acceso === thing.Acceso
                        ))).map(myVal => {
                            let object = {
                                ...myVal,
                                SubAccesos: result[0].filter(val => val.parent_name === myVal.Acceso).map(
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