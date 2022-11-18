const global = require('../../lib/globals/model.global');
const { order_detail } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, order_detail.name, order_detail.name_table, req);
exports.read = async(res) => global.read(res, order_detail.name, order_detail.name_table);
exports.readByOrderId = async(res, res_search) => global.readByOne(res, order_detail.name, order_detail.name_table, 'ODT_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, order_detail.name, order_detail.name_table, res_column, 'ODT_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, order_detail.name, order_detail.name_table, 'ODT_ID', res_update);