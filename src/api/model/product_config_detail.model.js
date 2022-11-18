const global = require('../../lib/globals/model.global');
const { product_config_detail } = require('../../lib/secret/key.secret');

exports.create = async (req, res) => global.create(res, product_config_detail.name, product_config_detail.name_table, req);
exports.read = async (res) => global.read(res, product_config_detail.name, product_config_detail.name_table);
exports.readByOne = async (res, res_search) => global.readByOne(res, product_config_detail.name, product_config_detail.name_table, 'PRT_ID', res_search);
exports.updateOne = async (res, res_column, res_update) => global.update(res, product_config_detail.name, product_config_detail.name_table, res_column, 'PRT_ID', res_update);
exports.deleteOne = async (res, res_update) => global.delete(res, product_config_detail.name, product_config_detail.name_table, 'PRT_ID', res_update);