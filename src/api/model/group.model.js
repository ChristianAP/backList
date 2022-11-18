const global = require('../../lib/globals/model.global');
const { group } = require('../../lib/secret/key.secret');

exports.read = async(res) => global.read(res, group.name, group.name_table);
exports.create = async(req, res) => global.create(res, group.name, group.name_table, req);
exports.IND = async(res) => global.IND(res, group.name, group.name_table, "GRO");
exports.readByOne = async(res, res_search) => global.readByOne(res, group.name, group.name_table, 'GRO_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, group.name, group.name_table, res_column, 'GRO_ID', res_update);
exports.deleteOne = async(res, res_delete) => global.delete(res, group.name, group.name_table, 'GRO_ID', res_delete);