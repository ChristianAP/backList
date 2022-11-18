const global = require('../../lib/globals/model.global');
const { type_ticket } = require('../../lib/secret/key.secret');

exports.create = async(req, res) => global.create(res, type_ticket.name, type_ticket.name_table, req);
exports.read = async(res) => global.read(res, type_ticket.name, type_ticket.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, type_ticket.name, type_ticket.name_table, 'TTC_ID', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, type_ticket.name, type_ticket.name_table, res_column, 'TTC_ID', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, type_ticket.name, type_ticket.name_table, 'TTC_ID', res_update);