const mysql = require("mysql");
const { promisify } = require("util");
const { database } = require("../lib/secret/key.secret");
const { logger } = require('../utils/logger');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            logger.info("Base de datos cerrada.");
            logger.info(err);
            // Enviar email a administradores cuando la base de datos se desconecta
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            logger.info("La base de datos tiene demasiadas conexiones.");
            logger.info(err);
            // Enviar email a administradores cuando la base de datos se desconecta
        }
        if (err.code === "ECONNREFUSED") {
            logger.info("Conexión rechazada.");
            logger.info(err);
            // Enviar email a administradores cuando la base de datos se desconecta
        }
    }

    if (connection) {
        connection.release();
    } else if (connection == undefined) {
        logger.info("EVA no se puede conectar a la DB.");
        return;
    }
    
    logger.info("EVA conectada a la DB.");
    return;
});

// Convertir callbacks a promesas
promisify(pool.query);

module.exports = pool;