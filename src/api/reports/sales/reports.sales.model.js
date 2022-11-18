const pool = require("../../../connection/connection");

// TO DO : revisar si usaremos lodash
var l = require('lodash');


exports.reportEarnings = async (res) => {
    await pool.query(
        `SELECT SUM(D.DOC_NETO) AS TOTAL, PM.PMT_NAME AS PAY 
        FROM (SELECT doc.DOC_NETO, if(doc.DOC_ESTADO="1",5,doc.PMT_ID) 
        AS PMT_ID FROM sv_document doc) AS D, sv_payment_method AS PM
        WHERE D.PMT_ID = PM.PMT_ID GROUP BY PM.PMT_NAME`,
        (err, result) => {
            try {
                if (result !== undefined || result.length !== 0 || err === null) {
                    const contado = result
                        .filter(item => item.PAY === 'AL CONTANDO')
                        .map(item => { return item['TOTAL'] })
                    const credito = result
                        .filter(item => item.PAY !== 'AL CONTANDO')
                        .map(item => {
                            return {
                                'TOTAL': item['TOTAL'],
                                'PAY': item['PAY']
                            }
                        })
                    const totalcredito = credito.reduce((a, b) => a + b.TOTAL, 0)

                    res.status(200).json({
                        'contado': contado[0],
                        credito,
                        totalcredito
                    });

                } else {
                    throw err;
                }
            } catch (error) {
                res.status(500).json({
                    message: err ? err : error,
                    status: 500,
                });
            }
        });
};

exports.reportSalesByMoths = async (res) => {
    let contado = await this.reportContadoReport(res, true);
    let credit = await this.reportCreditReport(res, true);

    let sales = contado.concat(credit);

    const mergedArray = Array.from(
        sales.reduce(
            (entryMap, e) => entryMap.set(e.FECHA, {...entryMap.get(e.FECHA)||{}, ...e}),
            new Map()
        ).values()
    );

    try {
        if (contado.length > 0 && credit.length > 0) {
        res.status(200).send(mergedArray);
        } else {
            throw 'No se encontraron datos';
        }
    } catch (error) {
        res.status(500).json({
            message: error,
            status: 500,
        });
    }
};

exports.reportContadoReport = async (res, ret) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `CALL PR_CONTADO_REPORT()`,
            (err, result) => {
                try {
                    if (result !== undefined || result.length !== 0 || err === null) {
                        ret ?
                            resolve(result[0]) :
                            res.status(200).json(result[0]);

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

exports.reportCreditReport = async (res, ret) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `CALL PR_CREDIT_REPORT()`,
            (err, result) => {
                try {
                    if (result !== undefined || result.length !== 0 || err === null) {
                        ret ?
                            resolve(result[0]) :
                            res.status(200).json(result[0]);

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
