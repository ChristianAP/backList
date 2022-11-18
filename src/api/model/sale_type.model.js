const global = require('../../lib/globals/model.global');
const { sale_type } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, sale_type.name, sale_type.name_table, req);
exports.read = async(res) => global.read(res, sale_type.name, sale_type.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, sale_type.name, sale_type.name_table, 'SLT_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, sale_type.name, sale_type.name_table, res_column, 'SLT_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, sale_type.name, sale_type.name_table, 'SLT_ID', res_update);