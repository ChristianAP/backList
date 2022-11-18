const pool = require("../../connection/connection");
const mysqlConnection = require("../../connection/connection");

exports.readByOne = async (res, body) => {
    const dataProducts = () => {
        return new Promise((resolve, reject) => {
            mysqlConnection.query(
                "CALL PR_PRODUCTS(?)", [body.PEDIDO],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            resolve(0);
                        } else if (rows != 0) {
                            resolve(rows[0]);
                        } else if (rows == 0) {
                            resolve(0);
                        }
                    } else {
                        console.log(err);
                        resolve(0)
                    }
                }
            );
        });
    };

    const dataCompany = () => {
        return new Promise((resolve, reject) => {
            mysqlConnection.query(
                `SELECT COM_ORGANIZATION_LOGO AS LOGO, COM_COMPANY_NAME AS COMPANY, COM_ORGANIZATION_SECTOR AS SECTOR,  COM_ORGANIZATION_RUC AS RUC, 
                COM_ORGANIZATION_DIRECTION AS DIRECTION, COM_ORGANIZATION_PHONE_ONE AS PHONE, COM_ORGANIZATION_EMAIL AS EMAIL FROM sv_company WHERE COM_ID = ?;`, [body.COMPANY],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            resolve(0);
                        } else if (rows != 0) {
                            resolve(rows);
                        } else if (rows == 0) {
                            resolve(0);
                        }
                    } else {
                        console.log(err);
                        resolve(0)
                    }
                }
            );
        });
    };

    const dataClient = () => {
        return new Promise((resolve, reject) => {
            mysqlConnection.query(
                "SELECT CONCAT(PER_NAME,' ', PER_LASTNAME) AS NOMBRE, PER_TRADENAME AS TRADENAME, PER_DIRECTION AS DIRECTION, PER_DNI AS DNI, PER_RUC AS RUC FROM sv_person WHERE PER_ID = ?;", [body.PERSON],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            resolve(0);
                        } else if (rows != 0) {
                            resolve(rows);
                        } else if (rows == 0) {
                            resolve(0);
                        }
                    } else {
                        console.log(err);
                        resolve(0)
                    }
                }
            );
        });
    };

    const dataP = await dataProducts();
    const dataC = await dataClient();
    const dataCo = await dataCompany();

    if (dataP != 0 && dataC != 0 && dataCo != 0) {
        res.send({
            products: dataP,
            client: dataC,
            company: dataCo,
        });
    } else {
        res.json({ message: "Existen errores eliminar", status: 404 });
    }
};