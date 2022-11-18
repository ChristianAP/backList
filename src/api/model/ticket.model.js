const global = require("../../lib/globals/model.global");
const pool = require("../../connection/connection");
const { ticket } = require("../../lib/secret/key.secret");

exports.create = async (req, res) => {
    global.create(res, ticket.name, ticket.name_table, req);
};

exports.read = async (res) => {
    global.read(res, ticket.name, ticket.name_table);
};

exports.updateOne = async (res, res_column, res_update) => {
    global.update(
        res,
        ticket.name,
        ticket.name_table,
        res_column[0],
        "TCK_ID",
        res_update
    );
};

exports.updateViewHour = async (res, res_column, res_update) => {
    global.update(
        res,
        ticket.name,
        ticket.name_table,
        res_column,
        "TCK_ID",
        res_update
    );
};

exports.deleteOne = async (res, res_update) => {
    global.delete(res, ticket.name, ticket.name_table, "TCK_ID", res_update);
};

exports.readByCircularReport = async (res) => {
    await pool.query(
        "SELECT STC.STC_NAME AS name, count(TIC.TCK_ID) AS value FROM sv_status_ticket AS STC, sv_ticket AS TIC WHERE TIC.STC_ID = STC.STC_ID GROUP BY STC.STC_NAME",
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran reportes",
                    status: 404,
                });
            } else if (err == null) {
                const datachart = [];
                for (var i in result) {
                    datachart.push(result[i]);
                }
                res.status(200).send(datachart);
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readByWeekReport = async (res) => {
    await pool.query("CALL PR_REPORT_FOR_WEEK()", (err, result) => {
        if (result === undefined) {
            res.status(500).json({
                message: "Error de servidor",
                status: 500,
            });
        } else if (result.length == 0) {
            res.status(404).json({
                message: "No se encuentran reportes",
                status: 404,
            });
        } else if (err == null) {
            const datachart = [];
            for (var i in result[0]) {
                datachart.push(result[0][i]);
            }
            res.status(200).send(datachart);
        } else {
            res.status(500).json({
                message: err,
                status: 500,
            });
        }
    });
};

exports.readByUserReport = async (res) => {
    await pool.query(
        "SELECT US.USR_USER AS name, COUNT(TC.USR_ID) AS value FROM sv_ticket AS TC, sv_user AS US WHERE TC.USR_ID IS NOT NULL AND TC.USR_ID = US.USR_ID GROUP BY TC.USR_ID",
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran reportes",
                    status: 404,
                });
            } else if (err == null) {
                const datachart = [];
                for (var i in result) {
                    datachart.push(result[i]);
                }
                res.status(200).send(datachart);
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readByOne = async (res, res_search) => {
    await pool.query("CALL PR_ONETICKET(?)", [res_search], (err, result) => {
        if (result === undefined) {
            res.status(500).json({
                message: "Error de servidor",
                status: 500,
            });
        } else if (result.length == 0) {
            res.status(404).json({
                message: "No se encuentran el ticket",
                status: 404,
            });
        } else if (err == null) {
            res.status(200).send(result[0][0]);
        } else {
            res.status(500).json({
                message: err,
                status: 500,
            });
        }
    });
};

exports.readAllTicket = async (res) => {
    await pool.query(
        'SELECT TC.*, CONCAT(PR.PER_NAME," ", PR.PER_LASTNAME) AS PERSON FROM sv_ticket AS TC, sv_person AS PR WHERE TC.PER_ID = PR.PER_ID',
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else if (err == null) {
                res.status(200).send(result);
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readAcordeStatus = async (res, param) => {
    await pool.query(
        "SELECT TC.TCK_ID AS ID, CONCAT(PR.PER_NAME,' ', PR.PER_LASTNAME) AS PERSON," +
        "ST.STC_NAME AS ESTADO, TC.TCK_PETITIONER AS ASUNTO, ST.STC_DESCRIPTION AS STATUS_DES," +
        "TC.TCK_REQUEST_DATE AS SOLICITADO, TC.TCK_FINAL_LOCATION AS LOCACION " +
        "FROM sv_ticket AS TC, sv_person AS PR, sv_status_ticket AS ST " +
        "WHERE TC.PER_ID = PR.PER_ID AND TC.STC_ID = ST.STC_ID AND TC.STC_ID = ?", [param],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (err === null) {
                res.status(200).send(result);
            } else if (result.length === 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readSinResolver = async (res, param) => {
    await pool.query(
        "SELECT TC.TCK_ID AS ID, CONCAT(PR.PER_NAME,' ', PR.PER_LASTNAME) AS PERSON, " +
        "ST.STC_NAME AS ESTADO, TC.TCK_PETITIONER AS ASUNTO, " +
        "TC.TCK_REQUEST_DATE AS SOLICITADO, TC.TCK_FINAL_LOCATION AS LOCACION, ST.STC_DESCRIPTION AS STATUS_DES, " +
        "US.USR_USER AS USUARIO FROM sv_ticket AS TC, sv_person AS PR, sv_status_ticket AS ST, sv_user AS US " +
        "WHERE TC.PER_ID = PR.PER_ID AND US.USR_ID = TC.USR_ID AND TC.STC_ID = ST.STC_ID AND TC.STC_ID <> 1 AND TC.STC_ID <> 4 ", [param],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (err === null) {
                res.status(200).send(result);
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readOtherStatus = async (res, param) => {
    await pool.query(
        `SELECT TC.TCK_ID AS ID, CONCAT(PR.PER_NAME,' ', PR.PER_LASTNAME) AS PERSON, TC.TCK_PETITIONER AS ASUNTO, 
        TC.TCK_REQUEST_DATE AS SOLICITADO, TC.TCK_FINAL_LOCATION AS LOCACION, ST.STC_NAME AS ESTADO, US.USR_USER AS USUARIO,  
        ST.STC_DESCRIPTION AS STATUS_DES FROM sv_ticket AS TC, sv_person AS PR, sv_status_ticket AS ST, sv_user AS US 
        WHERE TC.PER_ID = PR.PER_ID AND US.USR_ID = TC.USR_ID AND TC.STC_ID = ST.STC_ID AND TC.STC_ID = ?`, [param],
        (err, result) => {
            if (result === undefined) {
                res.status(500).json({
                    message: "Error de servidor",
                    status: 500,
                });
            } else if (err == null) {
                res.status(200).send(result);
            } else if (result.length == 0) {
                res.status(404).json({
                    message: "No se encuentran registros",
                    status: 404,
                });
            } else {
                res.status(500).json({
                    message: err,
                    status: 500,
                });
            }
        }
    );
};

exports.readAcordeStatusByPersinId = async (res, id) => {
    await pool.query(
        `SELECT TC.TCK_ID AS ID, CONCAT(PR.PER_NAME," ", PR.PER_LASTNAME) AS PERSON, ST.STC_NAME AS ESTADO, TC.TCK_PETITIONER AS ASUNTO, 
        TC.TCK_DESCRIPTION AS DESCRIPTION, TC.TCK_REQUEST_DATE AS SOLICITADO, TC.TCK_FINAL_LOCATION AS LOCACION, ST.STC_DESCRIPTION AS STATUS_DES 
        FROM sv_ticket AS TC, sv_person AS PR, sv_status_ticket AS ST WHERE TC.PER_ID = PR.PER_ID AND TC.STC_ID = ST.STC_ID AND PR.PER_ID = ?`, [id],
        (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.status(200).json({
                        message: "No se Encuentran Registros",
                        status: 200,
                        err: result
                    });
                } else {
                    res.status(200).send(result);
                }
            } else {
                res.status(500).json({
                    message: err.code,
                    status: err.errno,
                });
            }
        }
    );
};

exports.alertTicketStatusOpen = async (res) => {
    const ticketSinAbrir = await alertTicketsSinAbrir();
    const timeEstimateEnd = await alertTimeEstimateEnd();

    var results = [];

    if (ticketSinAbrir !== false) {
        results.push(ticketSinAbrir);
    }

    if (timeEstimateEnd !== false) {
        results.push(timeEstimateEnd);
    }

    if (results.length > 0) {
        res.status(200).send(results);
    } else {
        res.json({
            message: "No se encuentran registros",
            status: 200,
        });
    }
};

const alertTicketsSinAbrir = async () => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT "Alerta Informe Ticket" AS TEA_TITLE, CONCAT("Tiene nuevos tickets sin abrir.") AS TEA_CLIENT,
        CONCAT("Tickets nuevos: ", CAST(COUNT(TCK_ID) AS CHAR(10))) AS TEA_DESCRIPTION, 
        CONCAT("Ultimo ticket abierto: ",MAX(TCK_VIEW_HOUR)) AS TEA_DATE, "orange.100" AS TEA_COLOR, 
        "ADB" AS TEA_TYPE FROM sv_ticket WHERE STC_ID = ?;`, [1],
            (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        resolve(false);
                    } else if (rows.length != 0) {
                        resolve(rows[0]);
                    }
                } else {
                    resolve(false);
                }
            }
        );
    });
};

const alertTimeEstimateEnd = async () => {
    return new Promise((resolve) => {
        pool.query(
            `SELECT "Alerta Informe Ticket" AS TEA_TITLE, CONCAT("Tickets con tiempo estimado vencido.") AS TEA_CLIENT,
            CONCAT("Tickets vencidos: ", CAST(COUNT(TCK_ID) AS CHAR(10))) AS TEA_DESCRIPTION,
            CONCAT("Id ultimo ticket: ", MAX(TCK_ID)) AS TEA_DATE, "#F7EE92" AS TEA_COLOR, 
            "ADB" AS TEA_TYPE FROM sv_ticket WHERE TCK_ESTIMATE_HOUR IS NOT NULL 
            AND DATEDIFF(TCK_ESTIMATE_HOUR, now()) < 0;`,
            (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        resolve(false);
                    } else if (rows.length != 0) {
                        resolve(rows[0]);
                    }
                } else {
                    resolve(false);
                }
            }
        );
    });
};