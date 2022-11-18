const global = require('../../lib/globals/model.global');
const { logs } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, logs.name, logs.name_table, req);
exports.read = async(res) => global.read(res, logs.name, logs.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, logs.name, logs.name_table, 'LGS_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, logs.name, logs.name_table, res_column, 'LGS_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, logs.name, logs.name_table, 'LGS_ID', res_update);