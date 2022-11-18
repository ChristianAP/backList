const global = require('../../lib/globals/model.global');
const { point_sale } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");


exports.readVentaByPOS = async (res, POS_ID) => {

    await pool.query(
        `select TABLA.*, s.STK_ID, s.STK_TODAY as stock from (select r.REM_ID, rd.RDT_AMOUNT,
        rd.RDT_PRICE, p.PRO_NAME, p.PRO_ID, rd.RDT_CODEBAR, rd.RDT_ID, p.PRO_IMAGE, p.CAT_ID,
        p.PRO_INAFECT as inafecta
        from sv_remission_details rd, sv_remission r, sv_product p
        WHERE r.POS_ID = ? AND  rd.RDT_STATUS = '1' AND rd.REM_ID = r.REM_ID AND rd.RDT_VENDIDO='0' AND
        p.PRO_ID = rd.PRO_ID  ) AS TABLA LEFT JOIN sv_stock s ON s.PRO_ID = TABLA.PRO_ID`,
        [POS_ID], (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    res.status(200).send(result);
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

exports.getUltimos = async (res, POS_ID) => {

    await pool.query(
        `select * from sv_remission WHERE POS_ID = ? order by REM_CODE DESC limit 1;`,
        [POS_ID], async (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    await pool.query(
                        `SELECT (@cont := @cont+1) AS secuencia , r.REM_ID, r.POS_ID, rd.PRO_ID, r.REM_CARRIER, r.REM_CODE, rd.RDT_ID, rd.RDT_PRICE, rd.RDT_STATUS, rd.RDT_VENDIDO, p.PRO_NAME ,
                        (CASE rd.RDT_VENDIDO
                                 when 0 then 'NO VENDIDO'
                                 when 1 then 'VENDIDO'
                                 else 'No encontrado'
                               end) as estado
                        FROM sv_remission r, sv_remission_details rd, sv_product p, (SELECT @cont := 0) AS B
                        where rd.REM_ID = r.REM_ID and r.POS_ID = ? and rd.PRO_ID = p.PRO_ID and r.REM_ID >= ?`,
                        [POS_ID, result[0].REM_ID], (err, result2) => {
                            if (result2) {
                                if (result2.length == 0) {
                                    res.status(200).json({
                                        message: "No se encuentran registros",
                                        status: 200,
                                    });
                                } else if (err == null) {
                                    res.status(200).send(result2);
                                } else {
                                    res.status(500).json({
                                        message: err,
                                        status: 500,
                                    });
                                }
                            }
                        }
                    );
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

exports.create = async (req, res) => global.create(res, point_sale.name, point_sale.name_table, req);
exports.read = async (res) => global.read(res, point_sale.name, point_sale.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, point_sale.name, point_sale.name_table, 'POS_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, point_sale.name, point_sale.name_table, res_column, 'POS_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, point_sale.name, point_sale.name_table, 'POS_ID', res_update);

exports.readRemissionsID = async (res, POS_ID, fecIni, fecFin) => {
    await pool.query(
        `SELECT (@cont := @cont+1) AS secuencia , r.REM_ID, r.POS_ID, rd.PRO_ID, r.REM_CARRIER, r.REM_CODE, rd.RDT_ID, rd.RDT_PRICE, rd.RDT_STATUS, rd.RDT_VENDIDO, p.PRO_NAME ,r.REM_DATECREATED,
    (CASE rd.RDT_VENDIDO
             when 0 then 'NO VENDIDO'
             when 1 then 'VENDIDO'
             else 'No encontrado'
           end) as estado
    FROM sv_remission r, sv_remission_details rd, sv_product p, (SELECT @cont := 0) AS B
    where rd.REM_ID = r.REM_ID and r.POS_ID = ? and rd.PRO_ID = p.PRO_ID and (r.REM_DATECREATED BETWEEN ? AND ? )`,
        [POS_ID, fecIni, fecFin], (err, result) => {
            if (result) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se encuentran registros",
                        status: 200,
                    });
                } else if (err == null) {
                    res.status(200).send(result);
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