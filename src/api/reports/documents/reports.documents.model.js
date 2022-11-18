const pool = require("../../../connection/connection");


exports.reportDocumentsEmits = async (res) => {
    await pool.query(`
    SELECT COUNT(DC.DCT_ID) AS VAL, DT.DCT_NAME 
    FROM sv_document AS DC, sv_document_type AS DT
    WHERE DC.DCT_ID = DT.DCT_ID
    GROUP BY DC.DCT_ID, DT.DCT_NAME ASC;`, (err, result) => {
        try {
            if (result !== undefined || result.length !== 0 || err === null) {
                res.status(200).json(result);
            } else {
                throw { status: 404, message: 'No se encontraron registros' };
            }
        } catch (error) {
            res.status(error ? error.status : 500).json({
                message: err ? err : error.message,
                status: error ? error.status : 500,
            });
        }
    });
};

exports.reportDocumentsEmitReport = async (res, ret) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT (SELECT COUNT(DOC_ESTADO) FROM sv_document WHERE DOC_ESTADO = 1) AS PAGADOS,
            (SELECT COUNT(DOC_ESTADO) FROM sv_document) AS EMITIDOS`,
            (err, result) => {
                try {
                    if (result !== undefined || result.length !== 0 || err === null) {
                        let data = [{
                            name: 'PAGADOS',
                            value: result[0].PAGADOS,
                        }, {
                            name: 'EMITIDOS',
                            value: result[0].EMITIDOS,

                        }];
                        ret ?
                            resolve(data) :
                            res.status(200).json(data);

                    } else {
                        throw err;
                    }
                } catch (error) {
                    ret ?
                        reject(error) :
                        res.status(500).json({
                            message: err ? err : error,
                            status: 500,
                        });
                }
            }
        );
    })
};