const global = require('../../lib/globals/model.global');
const { category } = require('../../lib/secret/key.secret');
const pool = require("../../connection/connection");

exports.readCategoriesActives = async(res, id) => {
    await pool.query(
        "select * from sv_category where CAT_STATUS= 1 ORDER BY CAT_NUMERATION", (err, result) => {
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

exports.create = async(req, res) => global.create(res, category.name, category.name_table, req);
exports.read = async(res) => global.read(res, category.name, category.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, category.name, category.name_table, 'CAT_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, category.name, category.name_table, res_column, 'CAT_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, category.name, category.name_table, 'CAT_ID', res_update);