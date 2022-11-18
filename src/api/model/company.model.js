const global = require('../../lib/globals/model.global');
const { company } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, company.name, company.name_table, req);
exports.read = async(res) => global.read(res, company.name, company.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, company.name, company.name_table, 'COM_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, company.name, company.name_table, res_column, 'COM_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, company.name, company.name_table, 'COM_ID', res_update);