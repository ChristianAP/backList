const global = require('../../lib/globals/model.global');
const { template } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, template.name, template.name_table, req);
exports.read = async(res) => global.read(res, template.name, template.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, template.name, template.name_table, 'TEM_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, template.name, template.name_table, res_column, 'TEM_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, template.name, template.name_table, 'TEM_ID', res_update);