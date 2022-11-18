const pool = require('../../connection/connection');
const global = require('../../lib/globals/model.global');
const { kardex } = require('../../lib/secret/key.secret');

exports.read = async(res) => {
    await pool.query("CALL PR_KARDEX()",
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor: " + err,
                    status: 500,
                });
            } else if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                res.status(200).send(result[0]);
            } else {
                res.json({
                    message: err,
                    status: err
                });
            }
        }
    )
}

exports.readByOneproductId = async(res, param) => {
    await pool.query("CALL PR_KARDEXBYPRODUCTO(?)", [param],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor: " + err,
                    status: 500,
                });
            } else if (result.length == 0) {
                res.json({
                    message: "No se encuentran registros",
                    status: 200
                });
            } else if (err == null) {
                res.status(200).send(result[0]);
            } else {
                res.json({
                    message: err,
                    status: err
                });
            }
        }
    )
}