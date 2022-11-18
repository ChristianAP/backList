const global = require('../../lib/globals/model.global');
const { evidence } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, evidence.name, evidence.name_table, req);
exports.read = async(res) => global.read(res, evidence.name, evidence.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, evidence.name, evidence.name_table, 'EVI_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, evidence.name, evidence.name_table, res_column, 'EVI_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, evidence.name, evidence.name_table, 'EVI_ID', res_update);