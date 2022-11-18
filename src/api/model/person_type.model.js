const global = require('../../lib/globals/model.global');
const { person_type } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, person_type.name, person_type.name_table, req);
exports.read = async(res) => global.read(res, person_type.name, person_type.name_table);
exports.IND = async(res) => global.IND(res, person_type.name, person_type.name_table, "PET");
exports.readByOne = async(res, res_search) => global.readByOne(res, person_type.name, person_type.name_table, 'PET_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, person_type.name, person_type.name_table, res_column, 'PET_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, person_type.name, person_type.name_table, 'PET_ID', res_update);