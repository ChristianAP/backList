const global = require('../../lib/globals/model.global');
const { exchange_rate } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, exchange_rate.name, exchange_rate.name_table, req);
exports.read = async(res) => global.read(res, exchange_rate.name, exchange_rate.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, exchange_rate.name, exchange_rate.name_table, 'XCR_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, exchange_rate.name, exchange_rate.name_table, res_column, 'XCR_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, exchange_rate.name, exchange_rate.name_table, 'XCR_ID', res_update);