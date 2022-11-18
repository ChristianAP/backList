const { onlyDate, onlyTime } = require("../globals/date.global");

const chat = (socket) => {
    socket.on("sendMessage", async (message, callback) => {
        let dateBack = await onlyDate();
        let hourBack = await onlyTime();
        message.MSS_DATE = dateBack;
        message.MSS_TIME = hourBack;
        socket.volatile.broadcast.emit("messageSocketAdmin", message);
        callback(message);
    });

}

module.exports = chat