const global = require('../../lib/globals/model.global');
const { remission } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.exportRemision = async (res, req) => await pool.query(
    `SELECT * FROM (
        SELECT p.PRO_NAME AS "INSUMO", ed.RDT_AMOUNT AS "PESO", ed.RDT_PRICE AS "PRECIO" 
        FROM sv_remission r, sv_remission_details ed, sv_product p 
        WHERE r.REM_ID = ed.REM_ID AND ed.PRO_ID = p.PRO_ID AND r.REM_ID=?
        UNION ALL 
        SELECT p.PRO_NAME AS "INSUMO", d.RDT_AMOUNT AS "PESO", ROUND(SUM(ed.RDT_PRICE),2) AS "PRECIO"
        FROM sv_remission r, sv_remission_details ed, 
        sv_product p , (SELECT "TOTAL" AS RDT_AMOUNT) d
        WHERE r.REM_ID = ed.REM_ID AND ed.PRO_ID = p.PRO_ID AND r.REM_ID=? GROUP BY p.PRO_NAME ) dem 
        ORDER BY dem.INSUMO,dem.PESO`, [req, req], (err, result) => {
    if (result === undefined) {
        res.status(500).json({
            message: "Error de servidor: " + err,
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
        res.json({
            message: err,
            status: 500,
        });
    }
});

exports.readFechaRemi = async (res, fechaIni, fechaFin) =>
    await pool.query(
        `SELECT *
        FROM sv_remission WHERE (REM_DATECREATED BETWEEN ? AND ? ) ORDER BY REM_CODE desc`, [fechaIni, fechaFin],
        (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    res.status(200).send(result);
                } else {
                    res.json({
                        message: err,
                        status: err,
                    });
                }
            } else {
                res.json({
                    message: err,
                    status: err,
                });
            }
        }
    );

exports.create = async (req, res) => global.create(res, remission.name, remission.name_table, req);
exports.read = async (res) => global.read(res, remission.name, remission.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, remission.name, remission.name_table, 'REM_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, remission.name, remission.name_table, res_column, 'REM_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, remission.name, remission.name_table, 'REM_ID', res_update);