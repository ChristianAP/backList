const global = require('../../lib/globals/model.global');
const { clasification } = require('../../lib/secret/key.secret');

exports.read = async(res) => global.read(res, clasification.name, clasification.name_table);
exports.create = async(req, res) => global.create(res, clasification.name, clasification.name_table, req);
exports.IND = async(res) => global.IND(res, clasification.name, clasification.name_table, "CLA");
exports.readByOne = async(res, res_search) => global.readByOne(res, clasification.name, clasification.name_table, 'CLA_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, clasification.name, clasification.name_table, res_column, 'CLA_ID', res_update);
exports.deleteOne = async(res, res_delete) => global.delete(res, clasification.name, clasification.name_table, 'CLA_ID', res_delete);