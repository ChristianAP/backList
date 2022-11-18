var saleOnline = require('./sales.socket')
var createTicket = require('./ticket.socket')
var chat = require('./messages.socket')

const rootSocket = (io) => {
    io.on("connection", (socket) => {
        saleOnline(socket);
        createTicket(socket);
        chat(socket);
    })
}

module.exports = rootSocket