const global = require('../../lib/globals/model.global');
const { buy_detail } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, buy_detail.name, buy_detail.name_table, req);
exports.read = async(res) => global.read(res, buy_detail.name, buy_detail.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, buy_detail.name, buy_detail.name_table, 'BYD_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, buy_detail.name, buy_detail.name_table, res_column, 'BYD_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, buy_detail.name, buy_detail.name_table, 'BYD_ID', res_update);