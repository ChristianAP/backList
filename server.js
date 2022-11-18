require('dotenv').config();
const express = require("express");
const app = express();
const index = require("./src/app");
const { logger } = require('./src/utils/logger');
const rootSocket = require('./src/lib/sockets/index.socket')
var fs = require('fs')

//SETTING
app.set("port", process.env.NODE_ENV != "production" ? process.env.SERVER_PORT : 5000);
app.use(index);

if (process.env.NODE_ENV === "production") {
    var https_options = {
        key: fs.readFileSync(process.env.PATH_FILE_KEY),
        cert: fs.readFileSync(process.env.PATH_FILE_CRT)
    };    
}

const server = require(process.env.NODE_ENV === "production" ? "https": "http").createServer(https_options, app);

const io = require("socket.io")(server, {
    transports: ["websocket"],
    perMessageDeflate: {
        threshold: 32768
    }
});

rootSocket(io)

server.listen(app.get("port"), () => {
    logger.info("Bienvenidos a EVA BACKEND");
    logger.info("El servicio esta corriendo en el puerto: ", app.get("port"));
});