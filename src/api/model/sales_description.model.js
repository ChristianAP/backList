const pool = require('../../connection/connection');
const global = require('../../lib/globals/model.global');
const codes = require("../../lib/responses/res.response");
const { sales_description } = require('../../lib/secret/key.secret');

exports.createByArray = async (req, res) => await pool.query(
    "INSERT INTO " + sales_description.name_table +
    " (DIS_ID, SAL_ID,PRD_ID,TSL_ID,SDT_AMOUNT,SDT_SUBTOTAL,SDS_DAYS_TO_SEND,SDS_STATUS) VALUES ?", [req],
    (err, result) => {
        if (result === undefined) {
            res.status(500).json({
                message: "Error de servidor: " + err,
                status: 500,
            });
        } else if (err == null) {
            res.json({
                message: codes.code_200(sales_description.name, "Se creo correctamente"),
                status: 200,
            });
        } else {
            res.json({
                message: err,
                status: 500,
            });
        }
    }
);

exports.readBySales = async (res, res_search, type) => await pool.query(

    type != "online" ? `SELECT sl.*,s.STK_ID , p.PRO_INAFECT, s.STK_TODAY, um.UOF_ID, um.UOF_ABREV as UOF_ABREV FROM sv_sales_description as sl, sv_product AS p,
    sv_product_details as pd, sv_stock as s, sv_unit_mean um where sl.DOC_ID="${res_search}" and sl.PRO_ID=p.PRO_ID 
    and s.PRO_ID=if(ISNULL(p.PRO_FATHER_ID),p.PRO_ID, p.PRO_FATHER_ID) AND p.PRO_ID = pd.PRO_ID and p.UOF_ID = um.UOF_ID and pd.PRL_ID=(select PRL_ID from sv_price_list 
    where PRL_STATUS='1' LIMIT 1);`
        :
        `SELECT sl.*,s.STK_ID , p.PRO_INAFECT, s.STK_TODAY, um.UOF_ID, um.UOF_ABREV as UOF_ABREV FROM sv_sales_description as sl, sv_product AS p, sv_unit_mean um,
    sv_stock as s where sl.DOC_ID="${res_search}" and sl.PRO_ID=p.PRO_ID and p.UOF_ID = um.UOF_ID 
    and s.PRO_ID=if(ISNULL(p.PRO_FATHER_ID),p.PRO_ID, p.PRO_FATHER_ID);`, (err, result) => {
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

exports.readByBuy = async (req, res) => await pool.query(

    "SELECT * FROM sv_sales_description WHERE DOC_ID=?", [req], (err, result) => {
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

exports.create = async (req, res) => global.create(res, sales_description.name, sales_description.name_table, req);
exports.read = async (res) => global.read(res, sales_description.name, sales_description.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, sales_description.name, sales_description.name_table, 'SDS_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, sales_description.name, sales_description.name_table, res_column, 'SDS_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, sales_description.name, sales_description.name_table, 'SDS_ID', res_update);
