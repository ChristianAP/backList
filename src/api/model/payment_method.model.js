const global = require('../../lib/globals/model.global');
const { payment_method } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, payment_method.name, payment_method.name_table, req);
exports.read = async(res) => global.read(res, payment_method.name, payment_method.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, payment_method.name, payment_method.name_table, 'PMT_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, payment_method.name, payment_method.name_table, res_column, 'PMT_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, payment_method.name, payment_method.name_table, 'PMT_ID', res_update);