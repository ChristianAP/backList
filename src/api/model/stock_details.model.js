const global = require('../../lib/globals/model.global');
const { stock_details } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, stock_details.name, stock_details.name_table, req);
exports.read = async(res) => global.read(res, stock_details.name, stock_details.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, stock_details.name, stock_details.name_table, 'STD_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, stock_details.name, stock_details.name_table, res_column, 'STD_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, stock_details.name, stock_details.name_table, 'STD_ID', res_update);