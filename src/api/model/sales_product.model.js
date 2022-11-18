const global = require('../../lib/globals/model.global');
const { sales_product } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, sales_product.name, sales_product.name_table, req);
exports.read = async(res) => global.read(res, sales_product.name, sales_product.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, sales_product.name, sales_product.name_table, 'SPR_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, sales_product.name, sales_product.name_table, res_column, 'SPR_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, sales_product.name, sales_product.name_table, 'SPR_ID', res_update);