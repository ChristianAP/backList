const global = require('../../lib/globals/model.global');
const { configuration } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, configuration.name, configuration.name_table, req);
exports.read = async(res) => global.read(res, configuration.name, configuration.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, configuration.name, configuration.name_table, 'CNF_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, configuration.name, configuration.name_table, res_column, 'CNF_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, configuration.name, configuration.name_table, 'CNF_ID', res_update);