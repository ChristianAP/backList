const global = require('../../lib/globals/model.global');
const { user_access } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, user_access.name, user_access.name_table, req);
exports.read = async(res) => global.read(res, user_access.name, user_access.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, user_access.name, user_access.name_table, 'UAC_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, user_access.name, user_access.name_table, res_column, 'UAC_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, user_access.name, user_access.name_table, 'UAC_ID', res_update);