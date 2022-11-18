const global = require('../../lib/globals/model.global');
const { history_ticket } = require('../../lib/secret/key.secret');
exports.create = async(req, res) => global.create(res, history_ticket.name, history_ticket.name_table, req);
exports.read = async(res) => global.read(res, history_ticket.name, history_ticket.name_table);
exports.readByOne = async(res, res_search) => global.readByOne(res, history_ticket.name, history_ticket.name_table, 'TCH', res_search);
exports.updateOne = async(res, res_column, res_update) => global.update(res, history_ticket.name, history_ticket.name_table, res_column, 'TCH', res_update);
exports.deleteOne = async(res, res_update) => global.delete(res, history_ticket.name, history_ticket.name_table, 'TCH', res_update);