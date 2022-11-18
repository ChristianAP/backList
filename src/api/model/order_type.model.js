const global = require('../../lib/globals/model.global');
const { order_type } = require('../../lib/secret/key.secret');

exports.read = async(res) => global.read(res, order_type.name, order_type.name_table);
exports.create = async(req, res) => global.create(res, order_type.name, order_type.name_table, req);
exports.IND = async(res) => global.IND(res, order_type.name, order_type.name_table, "ORT");
exports.readByOne = async(res, res_search) => global.readByOne(res, order_type.name, order_type.name_table, 'ORT_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, order_type.name, order_type.name_table, res_column, 'ORT_ID', res_update);
exports.deleteOne = async(res, res_delete) => global.delete(res, order_type.name, order_type.name_table, 'ORT_ID', res_delete);