require('dotenv').config()
const pool = require('../../connection/connection')
const mysqlConnection = require('../../connection/connection')
var nodemailer = require('nodemailer')
//const pdf = require("html-pdf");
//var htmltopdf = require('htmltopdf')
const fs = require('fs');
const options = { format: 'A4' };
const { logger } = require('../../utils/logger')
const puppeteer = require('puppeteer');
const { read } = require('./company.model');
const { readByOne } = require('./document.model');
// TO - DO
// AGREGAR URL DE LA PLATAFORMA PARA QUE LLEVE DANDO CLICK EN EL CORREO
async function generarPdf(idOrder, body) {

    // const idVenta = () => {
    //     return new Promise((resolve) => {
    //         mysqlConnection.query(
    //             `Select ORD_ID_VENTA FROM sv_orders where ORD_ID = "${idOrder}"`,
    //             (err, rows) => {
    //                 if (!err) {
    //                     if (rows == undefined || rows.length == 0 || rows == 0) {
    //                         resolve([])
    //                     } else if (rows != 0) {
    //                         resolve(rows[0])
    //                     }
    //                 } else {
    //                     logger.info(err)
    //                 }
    //             },
    //         )
    //     })
    // }
    // const idventa = await idVenta()

    // const company = () => {
    //     return new Promise((resolve) => {
    //         mysqlConnection.query(
    //             'SELECT * FROM sv_company',
    //             (err, rows) => {
    //                 if (!err) {
    //                     if (rows == undefined || rows.length == 0 || rows == 0) {
    //                         resolve([])
    //                     } else if (rows != 0) {
    //                         resolve(rows)
    //                     }
    //                 } else {
    //                     logger.info(err)
    //                 }
    //             },
    //         )
    //     })
    // }
    // const data = () => {
    //     return new Promise((resolve) => {
    //         mysqlConnection.query(
    //             `select d.*, DATE_FORMAT(d.DOC_DATE,'%d/%m/%Y') as DOC_DATE2, dt.DCT_NAME, pm.PMT_NAME 
    //             from sv_document as d,sv_document_type as dt, sv_payment_method as pm 
    //             where dt.DCT_ID=d.DCT_ID and (d.SLT_ID=5 OR d.SLT_ID=15) and d.DOC_DOC_TYPE not IN ('COTIZACION','NOTA DE VENTA') 
    //             and pm.PMT_ID = d.PMT_ID AND d.DOC_ID=? order by d.DOC_ID DESC;`, [idventa.ORD_ID_VENTA],
    //             (err, rows) => {
    //                 if (!err) {
    //                     if (rows == undefined || rows.length == 0 || rows == 0) {
    //                         resolve([])
    //                     } else if (rows != 0) {
    //                         resolve(rows)
    //                     }
    //                 } else {
    //                     logger.info(err)
    //                 }
    //             },
    //         )
    //     })
    // }
    // const productos = () => {
    //     return new Promise((resolve) => {
    //         mysqlConnection.query(
    //             "online" != "online" ? `SELECT sl.*,s.STK_ID , p.PRO_INAFECT, s.STK_TODAY FROM sv_sales_description as sl, sv_product AS p,
    //                 sv_product_details as pd, sv_stock as s where sl.DOC_ID="${idventa.ORD_ID_VENTA}" and sl.PRO_ID=p.PRO_ID 
    //                 and s.PRO_ID=if(ISNULL(p.PRO_FATHER_ID),p.PRO_ID, p.PRO_FATHER_ID) AND p.PRO_ID = pd.PRO_ID and pd.PRL_ID=(select PRL_ID from sv_price_list 
    //                 where PRL_STATUS='1');`
    //                 :
    //                 `SELECT sl.*,s.STK_ID , p.PRO_INAFECT, s.STK_TODAY FROM sv_sales_description as sl, sv_product AS p,
    //                 sv_stock as s where sl.DOC_ID="${idventa.ORD_ID_VENTA}" and sl.PRO_ID=p.PRO_ID 
    //                 and s.PRO_ID=if(ISNULL(p.PRO_FATHER_ID),p.PRO_ID, p.PRO_FATHER_ID);`,
    //             (err, rows) => {
    //                 if (!err) {
    //                     if (rows == undefined || rows.length == 0 || rows == 0) {
    //                         resolve([])
    //                     } else if (rows != 0) {
    //                         resolve(rows)
    //                     }
    //                 } else {
    //                     logger.info(err)
    //                 }
    //             },
    //         )
    //     })
    // }

    const dataProducts = () => {
        return new Promise((resolve) => {
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
                    }
                }
            );
        });
    };

    const dataCompany = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                `SELECT COM_ORGANIZATION_LOGO AS LOGO, COM_COMPANY_NAME AS COMPANY, COM_ORGANIZATION_SECTOR AS SECTOR,  COM_ORGANIZATION_RUC AS RUC, 
                COM_ORGANIZATION_DIRECTION AS DIRECTION, COM_ORGANIZATION_PHONE_ONE AS PHONE, COM_ORGANIZATION_EMAIL AS EMAIL FROM sv_company WHERE COM_ID = ?;`, [2],
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
                    }
                }
            );
        });
    };

    const dataClient = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                "SELECT CONCAT(PER_NAME,' ', PER_LASTNAME) AS NOMBRE, PER_TRADENAME AS TRADENAME, PER_DIRECTION AS DIRECTION, PER_DNI AS DNI, PER_RUC AS RUC FROM sv_person WHERE PER_ID = ?;", [body.IDCLIENT],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            resolve(0);
                        } else if (rows != 0) {
                            resolve(rows);
                        } else if (rows == 0) {
                            resolve(0);
                        }
                    }
                }
            );
        });
    };
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    // const data_company = await company();
    // const data_data = await data();
    // const data_products = await productos();
    // console.log(data_products)

    const dataP = await dataProducts();
    const client = await dataClient();
    const company = await dataCompany();
    // console.log(dataP);
    console.log(client);
    // console.log(dataCo);

    // if (dataP != 0 && dataC != 0 && dataCo != 0) {
        await page.setContent(`
        <table class='m_7441485788288210047email-body' style='font-family:Verdana,sans-serif;box-sizing:border-box;width:900px;margin:0 auto;padding:0;background-color:#fff' align='center' width='600' cellpadding='0' cellspacing='0'>
              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                  <tr>
                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                          <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' height='5px' cellspacing='0'>
                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                  <tr>
                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' bgcolor='#24468A'></td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;padding:24px'>
                          <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:16px' width='100%' cellpadding='0' cellspacing='0'>
                              <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:20px;font-weight:600;margin-bottom:8px'>
                                  `+ company[0].COMPANY + `</p>
                                  <br>
                                  <hr>
                                  <br>
                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                <tr>
                                  <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' colspan='2'>
                                    <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                      <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                        <tr>
                                      
                                          <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='40%'>
                                            <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:16px' width='100%' cellpadding='0' cellspacing='0'>
                                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                  <tr>
                                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                              Descripción: <span>`+ company[0].SECTOR + `</span> </p>
    
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                              Dirección: `+ company[0].DIRECTION + ` </p>
                                                      </td>
                                                  </tr>
    
                                                  <tr>
                                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' colspan='2'>
                                                          <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                                  <tr>
                                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%'>
                                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                                              Celular: `+ company[0].PHONE + `</p>
                                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                                              Email: `+ company[0].EMAIL + `</p>
                                                                      </th>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                            </table>
                                          </th>
                                          <th style='font-family:Verdana,sans-serif;box-sizing:border-box; border: 1px solid black; padding: 1%;' width='30%'>
                                            <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:16px' width='100%' cellpadding='0' cellspacing='0'>
                                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                <tr>
                                                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                                        <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:20px;font-weight:600;margin-bottom:8px'>
                                                            BOLETA ELECTRÓNICA </p>
    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                                        <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:18px;font-weight:200;margin-bottom:8px'>
                                                            RUC: `+ company[0].RUC + ` </p>
                                                    </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </th>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                          </table>
                          <hr>
                          <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:16px' width='100%' cellpadding='0' cellspacing='0'>
                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                  <tr>
                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                              Cliente:  `+ ((client[0].NOMBRE.trim()).length > 0 ? client[0].NOMBRE : client[0].TRADENAME) + ` </p>
    
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                              Dirección: `+ client[0].DIRECTION + ` </p>
                                      </td>
                                  </tr>
    
                                  <tr>
                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' colspan='2'>
                                          <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                  <tr>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='30%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                              DNI/RUC: `+ (client[0].DNI == '' ? client[0].RUC : client[0].DNI) + `</p>
                                                      </th>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='30%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                              Moneda: <span style="font-weight: 100;">Sol</span></p>
                                                      </th>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='40%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                              Fecha: <span style="font-weight: 100;">`+ body.ORD_DATE_ORDER2 + `</span></p>
                                                      </th>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <hr>
            <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:16px' width='100%' cellpadding='0' cellspacing='0'>
                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                  <tr>
                                      <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' colspan='2'>
                                          <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                              <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                  <tr>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='45%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                              PRODUCTO</p>
                                                      </th>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                              CANTIDAD</p>
                                                      </th>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                              PRECIO UNITARIO</p>
                                                      </th>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                              PRECIO SUBTOTAL</p>
                                                      </th>
                                                      <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                          <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                              PRECIO TOTAL</p>
                                                      </th>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
            `+
            dataP
                .map((val) => {
                    return (`<table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:16px' width='100%' cellpadding='0' cellspacing='0'>
                    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                        <tr>
                            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' colspan='2'>
                                <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                        <tr>
                                            <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='45%'>
                                                <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                    `+ (val.PRODUCTO) + `</p>
                                            </th>
                                            <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                 `+ Number(val.CANTIDAD).toFixed(2)
                        + `</p>
                                            </th>
                                            <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                s/. `+ val.PRECIO.toFixed(2)/Number(val.CANTIDAD)  + `</p>
                                            </th>
                                            <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                s/. `+ val.SUBTOTAL.toFixed(2) + `</p>
                                            </th>
                                            <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='10%'>
                                                <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>
                                                s/. `+ (Number(val.PRECIO).toFixed(2)) + `</p>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>`)
                }) + `
                <hr>
                      <br>
                      <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:16px' width='100%' cellpadding='0' cellspacing='0'>
                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                              <tr>
                                  <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' colspan='2'>
                                      <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                              <tr>
                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='60%'>
                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                      SON: `+body.TOTAL+` con 0/100 soles</p>
                                                  </th>
                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='40%'>
                                                  <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                              <tr>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box; padding-right: 5%; border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          Descuento</p>
                                                                  </th>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box; border: 1px solid black; padding-left: 5%;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          s/. `+Number(body.DESCUENTO).toFixed(2)+`</p>
                                                                  </th>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                              <tr>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box; padding-right: 5%; border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          Operación grabada</p>
                                                                  </th>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box; border: 1px solid black; padding-left: 5%;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          s/. `+body.TOTAL+`</p>
                                                                  </th>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                              <tr>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box;padding-right: 5%; border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          Operación exonerada</p>
                                                                  </th>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box; padding-left: 5%; border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                      s/. 00.0</p>
                                                                  </th>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                              <tr>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box;padding-right: 5%;border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          Operación inafecta

                                                                      </p>
                                                                  </th>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box;padding-left: 5%; border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          s/. 00.0</p>
                                                                  </th>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <table style='font-family:Verdana,sans-serif;box-sizing:border-box;' width='100%' cellpadding='0' cellspacing='0'>
                                                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                              <tr>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box;padding-right: 5%;border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px;'>
                                                                          IGV</p>
                                                                  </th>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box;padding-left: 5%; border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                        s/. `+  String(body.IGV).substring(0,5) +`</p>
                                                                  </th>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                      <table style='font-family:Verdana,sans-serif;box-sizing:border-box;' width='100%' cellpadding='0' cellspacing='0'>
                                                          <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                              <tr>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box;padding-right: 5%; border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                          Importe total</p>
                                                                  </th>
                                                                  <th style='font-family:Verdana,sans-serif;box-sizing:border-box; padding-left: 5%;border: 1px solid black;' width='50%'>
                                                                      <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:15px;font-weight:600;margin-bottom:8px'>
                                                                      s/. `+body.TOTAL+`</p>
                                                                  </th>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </th>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>

          </tbody>
      </table>`)
        await page.pdf({ path: 'public/comprobante.pdf', format: 'A4' });
    // } else {
    //     res.json({ message: "Existen errores eliminar", status: 404 });
    // }


    
  
}

const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
    tls: {
        rejectUnauthorized: false
    }
})



exports.voucherAcepted = async (res, body) => {
    console.log(body);
    if (body.ESTADO === 4) {
        await generarPdf(body.PEDIDO, body)
    }

    const dataProducts = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                'CALL PR_PRODUCTS(?)', [body.PEDIDO],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0 || rows == 0) {
                            logger.info(
                                `CALL PR_PRODUCTS(?) || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows != 0) {
                            resolve(rows[0])
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }

    const dataPerson = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                `SELECT CONCAT(PE.PER_NAME, " ", PE.PER_LASTNAME) AS PERSON, PE.PER_DNI AS DNI, PE.PER_RUC AS RUC,CONCAT(PE.PER_DISTRIC," ",PE.PER_DIRECTION) AS DIRECTION ,
                COM.COM_ORGANIZATION_LOGO AS LOGO, COM.COM_COMPANY_NAME AS COMPANY
               FROM sv_person AS PE, sv_orders AS ORS, sv_client AS CL, sv_company AS COM
               WHERE ORS.CLI_ID = CL.CLI_ID AND PE.PER_ID = CL.PER_ID AND ORS.ORD_ID = ? AND COM.COM_ID = ?`, [body.PEDIDO, 2],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            logger.info(
                                `dataPerson || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows.length != 0) {
                            resolve(rows)
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }

    const dataCompany = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(`SELECT * FROM sv_company `, [], (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        logger.info(
                            `dataCompany || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                        )
                        res.status(500).json({
                            message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                            error: err,
                            status: 500,
                        })
                    } else if (rows.length != 0) {
                        resolve(rows)
                    }
                } else {
                    logger.info(err)
                }
            })
        })
    }
    
    const company = await dataCompany()
    const getData = await dataProducts()
    const getPerson = await dataPerson()
    if (body.ESTADO === 4) {
        await generarPdf(body.PEDIDO, body);
    }
    let productsArray = ''
    // for (i in getData) {
    //     productsArray =
    //         productsArray +
    //         `<tr>
    //                 <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:left' width='40%'>
    //                     <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px'>` +
    //         getData[i].PRODUCTO +
    //         ` </p>
    //                 </td>
    //                 <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:center' width='20%'>
    //                     <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:16px'>S/ ` +
    //         getData[i].PRECIO +
    //         `</p>
    //                 </td>
    //                 <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:center' width='20%'>
    //                     <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:16px'>x` +
    //         getData[i].CANTIDAD +
    //         `</p>
    //                 </td>
    //                 <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:right' width='20%'>
    //                     <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:16px'>S/ ` +
    //         getData[i].SUBTOTAL +
    //         `</p>
    //                 </td>
    //             </tr>`
    // }
    // let tablaGeneral =
    //     `<style>
    //     .body {
    //         margin: 0 auto;
    //         @import url('https://fonts.googleapis.com/css2?family=Anek+Latin&display=swap');
    //         @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
    //         /* background-color: azure; */
    //     }

    //     .general {
    //         background-color: white;
    //         width: 400px;
    //     }

    //     .header {
    //         background-color: #008ee3;
    //         background: linear-gradient(to right, #008ee3, #046298);
    //         height: 80px;
    //         width: 100%;
    //         display: flex;
    //         align-items: center;
    //         align-content: center;
    //     }

    //     .imagen {
    //         width: 100%;
    //         height: 100%;
    //         text-align: center;
    //         background-color: transparent;
    //     }

    //     .welcome {
    //         width: 100%;
    //         padding: 5px;
    //         padding-left: 10px;
    //         height: 15px;
    //         margin-bottom: 60px;
    //         font-family: 'Anek Latin', sans-serif;
    //         font-size: 15px;
    //         color: #008ee3;
    //     }

    //     .pedido_online {
    //         margin-top: 20px;
    //         width: 100%;
    //     }

    //     .observaciones {
    //         margin-top: 30px;
    //         padding-left: 11px;
    //         font-size: 14px;
    //     }

    //     .resumen_pedido {
    //         margin-top: 25px;
    //         font-size: 28px;
    //     }

    //     .pasos_online {
    //         padding: 15px;
    //         width: 100%;
    //     }

    //     .desc_pasos {
    //         margin-top: -25px;
    //         font-family: 'Anek Latin', sans-serif;
    //         font-size: 14px;
    //     }

    //     .des_obser {
    //         color: gray;
    //         margin-bottom: 10px;
    //         font-family: 'Anek Latin', sans-serif;
    //     }

    //     /* codigo de confirmacion */
    //     .codigo {
    //         color: #008ee3;
    //         margin-top: 80px;
    //         font-size: 75px;
    //         font-weight: bold;
    //         font-family: 'Anek Latin', sans-serif;
    //         margin-bottom: 50px;
    //     }

    //     .codigo_confirmacion {
    //         width: 100%;
    //         height: 40%;
    //     }

    //     .desc_pasos {
    //         color: gray;
    //     }

    //     .state_pedido {
    //         color: #008ee3;
    //     }

    //     .linea_obser {
    //         background: #008ee3;
    //         background-color: #008ee3;
    //         color: #008ee3;
    //         font-weight: bold;
    //         height: 3px;
    //     }

    //     .name {
    //         font-weight: bold;
    //     }

    //     .information {
    //         width: 100%;
    //         height: auto;
    //         background-color: white;
    //     }

    //     .end {
    //         width: 100%;
    //         background-color: #008ee3;
    //         background: linear-gradient(to right, #008ee3, #046298);
    //         height: 70px;
    //         display: flex;
    //         align-items: center;
    //         align-content: center;
    //     }

    //     .info_contacto {
    //         background-color: transparent;
    //         color: white;
    //         font-size: 12px;
    //         width: 100%;
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         align-content: center;
    //         align-self: center;
    //     }


    //     .pasitos {
    //         margin-top: 30px;
    //         display: flex;
    //         flex-direction: row;
    //         gap: 5px;
    //     }

    //     /* PARA CUANDO ESTE ACTIVO EL PASO */
    //     .caja_pasos{
    //         padding: 10px;
    //         border: 1px solid white;
    //         color: white;
    //         border-radius: 10px;
    //         width: 65px;
    //         height: 65px;
    //         display: flex;
    //         flex-direction: column;
    //         align-self: center;
    //         align-content: center;
    //         justify-content: center;
    //         justify-items: center;
    //         align-items: center;
    //     }

    //     .paso_active {
    //         border: 1px solid white;
    //         background-color: #008ee3;
    //         color: white;
    //     }

    //     /* PARA CUANDO EL PASO AUN NO ESTA EN ACTIVO */

    //     .paso_rechazado {
    //         border: 1px solid white;
    //         background-color: red;
    //         color: white;
    //     }

    //     .paso_desactive {
    //         border: 1px solid #008ee3;
    //         background-color: white;
    //         color: #008ee3;
    //     }

    //     .circle {
    //         width: 15px;
    //         height: 15px;
    //         border-radius: 50%;
    //         margin: -2px;
    //         align-items: center;
    //     }

    //     .circle_activado {
    //         background-color: rgb(47, 241, 47);
    //     }

    //     .circle_rechazado {
    //         background-color: white;
    //     }

    //     .circle_desactive {
    //         background-color: white;
    //         border: 0.5px solid #008ee3;
    //     }

    //     .desc_paso {
    //         text-align: center;
    //         margin-left: 10px;
    //         margin-right: 10px;
    //     }

    //     .nro_paso {
    //         font-size: 20px;
    //         font-family: 'Open Sans', sans-serif;
    //         margin-top: -25px;
    //         display: contents;
    //     }

    //     .description_pasitos {
    //         margin-top: 10px;
    //         display: flex;
    //         flex-direction: column;
    //         font-size: 6px;
    //         align-items: center;
    //         font-family: 'Open Sans', sans-serif;
    //     }

    //     .info_status_entrega {
    //         width: 85%;
    //         margin-top: 30px;
    //         font-size: 12px;
    //         margin-left: 10px;
    //         margin-right: 10px;
    //         font-family: 'Anek Latin', sans-serif;
    //         color: rgb(118, 114, 114);
    //     }

    //     .comunication {
    //         width: 100%;
    //         margin-top: 30px;
    //         margin-left: -4%;
    //         font-size: 12px;
    //         font-family: 'Anek Latin', sans-serif;
    //         color: rgb(118, 114, 114);
    //     }
    // </style>

    // <body class="body">
    //     <div class="general">
    //         <div class="header">
    //             <div class="imagen">
    //                 <img style="width: 40%;height: 60%;margin: 20px;margin-left: -20px;" src="./img/phyona_blanco.png">
    //             </div>
    //         </div>
    //         <div class="information">
    //             <!-- BIENVENIDA Y NOMBRE DEL CLIENTE AL QUE SE ENVIARÁ EL CORREO -->
    //             <div class="welcome">
    //                 <p class="hello">Hola,</p>
    //                 <p class="name">Nick Meza Rivera</p>
    //             </div>
    //             <!-- OBSERVACIONES DEL PEDIDO Y LOS PASOS DEL PEDIDO ONLINE -->
    //             <div class="pedido_online">
    //                 <div class="observaciones">
    //                     <p class="des_obser">Observaciones de tu pedido: </p>
    //                     <div class="linea_obser">&nbsp;</div>
    //                 </div>
    //                 <div class="pasos_online">
    //                     <div class="desc_pasos">
    //                         <p class="encuentra">Tu pedido se encuentra:<strong class="state_pedido"> &nbsp; EN
    //                                 PROCESO</strong> </p>
    //                     </div>
    //                     <div class="pasitos">
    //                         <div class="paso_active caja_pasos">
    //                             <h1 class="nro_paso">1</h1>
    //                             <div class="description_pasitos">
    //                                 <div class="circle circle_activado">&nbsp;</div>
    //                                 <h2 class="desc_paso">Pedido Registrado</h2>
    //                             </div>
    //                         </div>
    //                         <div class="paso_rechazado caja_pasos">
    //                             <h1 class="nro_paso">2</h1>
    //                             <div class="description_pasitos">
    //                                 <div class="circle circle_rechazado">&nbsp;</div>
    //                                 <h2 class="desc_paso">Pedido Registrado</h2>
    //                             </div>
    //                         </div>
    //                         <div class="paso_desactive caja_pasos">
    //                             <h1 class="nro_paso">3</h1>
    //                             <div class="description_pasitos">
    //                                 <div class="circle circle_desactive">&nbsp;</div>
    //                                 <h2 class="desc_paso">Pedido Registrado</h2>
    //                             </div>
    //                         </div>
    //                         <div class="paso_desactive caja_pasos">
    //                             <h1 class="nro_paso">4</h1>
    //                             <div class="description_pasitos">
    //                                 <div class="circle circle_desactive">&nbsp;</div>
    //                                 <h2 class="desc_paso">Pedido Registrado</h2>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <!--  CONFIRMACIÓN DEL PEDIDO -->
    //                     <!-- <div class="resumen_pedido">
    //                             <p class="des_obser">Resumen de tu pedido de tu pedido: </p>
    //                             <div class="linea_obser">&nbsp;</div>
    //                             <div class="cuerpo_resumen">

    //                             </div>
    //                     </div> -->

    //                     <!-- PARA DETALLE DE ENTREGA ... -->

    //                     <div class="info_status_entrega">
    //                         <div style="margin: 0 auto; width: fit-content;">
    //                             <P>DETALLE DE LA ENTREGA:</P>
    //                             <P>DÍA DE LA ENTREGA: <strong style="color: rgb(37, 36, 36)">31/08/2022 de 09:00 am. a 6:00
    //                                     pm.</strong></P>
    //                             <p>DIRECCIÓN DE LA ENTREGA: <strong style="color: rgb(37, 36, 36)">Calle Portales 123 - San
    //                                     Juan de Miraflores</strong></p>
    //                         </div>
    //                     </div>
    //                     <!-- PARA DETALLE DE PEDIDO ERRONEO -->
    //                     <!-- <div class="info_status_entrega">
    //                         <div style="margin: 0 auto; width: fit-content;"> 
    //                             <div style="width: 70%; margin: 0 auto; text-align: center; font-size: 23px;">
    //                                 <p>Por favor, volver a intentar subir el <strong style="color: rgb(37, 36, 36)">voucher o comprobante de pago o realizar de nuevo su pedido</strong>
    //                                 en nuestra tienda virtual</p>
    //                                 <p>Si cree que es un error de nuestro sistema, por favor comunicarse al:
    //                                     <strong style="color: rgb(37, 36, 36)">01 982-24345 o +51 987 654 321</strong> para poder brindarle atención a la brevedad.
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div> -->

    //                     <div class="comunication">
    //                         <div style="width: 70%; margin: 0 auto; text-align: center;">
    //                             <p>Nos estaremos comunicando <strong style="color: rgb(37, 36, 36)">via correo
    //                                     electrónico</strong>
    //                                 para poder informarle acerca del estado de su pedido</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             <!-- EN EL CASO DE CÓDIGO DE CONFIRMACIÓN -->
    //             <!-- <div class="codigo_confirmacion">
    //                 <div class="observaciones">
    //                     <p class="des_obser">Tu código de confirmación es: </p>
    //                     <div class="linea_obser">&nbsp;</div>
    //                     <p class="codigo">568379</p>
    //                 </div>
    //                 <div class="comunication">
    //                     <div style="width: 70%; margin: 0 auto; text-align: center;">                            
    //                         <p>Nos estaremos comunicando <strong style="color: rgb(37, 36, 36)">via correo electrónico</strong>
    //                         para poder informarle acerca del estado de su pedido</p>
    //                     </div>
    //                 </div>
    //             </div> -->
    //         </div>
    //         <div class="end">
    //             <div class="info_contacto">
    //                 <p style="text-align: center;">¿Tienes dudas o consultas?</p>
    //                 <p style="text-align: center;">Contáctanos al : <strong>01 123 - 4576 o +51 998 765 432</strong> </p>
    //             </div>
    //         </div>
    //     </div>
    // </body>`
    for (i in getData) {
        productsArray =
            productsArray +
            `<tr>
                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:left' width='40%'>
                        <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px'>` +
            getData[i].PRODUCTO +
            ` </p>
                    </td>
                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:center' width='20%'>
                        <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:16px'>S/ ` +
            getData[i].PRECIO +
            `</p>
                    </td>
                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:center' width='20%'>
                        <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:16px'>x` +
            getData[i].CANTIDAD +
            `</p>
                    </td>
                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;text-align:right' width='20%'>
                        <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:16px'>S/ ` +
            getData[i].SUBTOTAL +
            `</p>
                    </td>
                </tr>`
    }
    let tablaGeneral =
        `<style>
        .body {
            margin: 0 auto;
            @import url('https://fonts.googleapis.com/css2?family=Anek+Latin&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
            /* background-color: azure; */
        }
    
        .general {
            background-color: white;
            width: 525px;
        }
    
        .header {
            background-color: #008ee3;
            background: linear-gradient(to right, #008ee3, #046298);
            height: 100px;
            width: 100%;
            display: flex;
            align-items: center;
            align-content: center;
        }
    
        .imagen {
            width: 100%;
            height: 100%;
            text-align: center;
            background-color: transparent;
        }
    
        .welcome {
            width: 100%;
            padding: 5px;
            padding-left: 10px;
            padding-bottom: 20px;
            height: 15px;
            font-family: 'Anek Latin', sans-serif;
            font-size: 17px;
            color: #008ee3;
        }
    
        .pedido_online {
            margin-top: 50px;
            width: 100%;
        }
    
        .observaciones {
            margin-top: 30px;
            padding-left: 11px;
            font-size: 15px;
        }
    
        .resumen_pedido {
            margin-top: 25px;
            font-size: 28px;
        }
    
        .pasos_online {
            padding: 15px;
            width: 100%;
        }
    
        .desc_pasos {
            margin-top: -25px;
            font-family: 'Anek Latin', sans-serif;
            font-size: 15px;
        }
    
        .des_obser {
            color: gray;
            margin-bottom: 10px;
            font-family: 'Anek Latin', sans-serif;
        }
    
        /* codigo de confirmacion */
        .codigo {
            color: #008ee3;
            margin-top: 80px;
            font-size: 75px;
            font-weight: bold;
            font-family: 'Anek Latin', sans-serif;
            margin-bottom: 50px;
        }
    
        .codigo_confirmacion {
            width: 100%;
            height: 40%;
        }
    
        .desc_pasos {
            color: gray;
        }
    
        .state_pedido {
            color: #008ee3;
        }
    
        .linea_obser {
            background: #008ee3;
            background-color: #008ee3;
            color: #008ee3;
            font-weight: bold;
            height: 3px;
            width: 100%;
        }
    
        .name {
            font-weight: bold;
            text-transform: uppercase;
        }
    
        .information {
            width: 100%;
            height: auto;
            background-color: white;
        }
    
        .end {
            width: 100%;
            background-color: #008ee3;
            background: linear-gradient(to right, #008ee3, #046298);
            height: 80px;
            display: flex;
            align-items: center;
            align-content: center;
        }
    
        .info_contacto {
            background-color: transparent;
            color: white;
            font-size: 13px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            align-self: center;
        }
    
    
        .pasitos {
            margin-top: 30px;
            display: flex;
            flex-direction: row;
            gap: 5px;
        }
    
        /* PARA CUANDO ESTE ACTIVO EL PASO */
        .caja_pasos{
            margin: 5px;
            padding: 8px;
            border: 1px solid white;
            color: white;
            border-radius: 10px;
            width: 92px;
            height: 92px;
            display: flex;
            flex-direction: column;
            align-self: center;
            align-content: center;
            justify-content: center;
            justify-items: center;
            align-items: center;
        }
    
        .paso_active {
            border: 1px solid white;
            background-color: #008ee3;
            color: white;
        }
    
        /* PARA CUANDO EL PASO AUN NO ESTA EN ACTIVO */
    
        .paso_rechazado {
            border: 1px solid white;
            background-color: red;
            color: white;
        }
    
        .paso_desactive {
            border: 1px solid #008ee3;
            background-color: white;
            color: #008ee3;
        }
    
        .circle {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin: -2px;
            align-items: center;
        }
    
        .circle_activado {
            background-color: rgb(47, 241, 47);
        }
    
        .circle_rechazado {
            background-color: white;
        }
    
        .circle_desactive {
            background-color: white;
            border: 0.5px solid #008ee3;
        }
    
        .desc_paso {
            text-align: center;
            margin-left: 10px;
            margin-right: 10px;
        }
    
        .nro_paso {
            font-size: 28px;
            font-family: 'Open Sans', sans-serif;
            margin-top: -25px;
            display: contents;
        }
    
        .description_pasitos {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            font-size: 8px;
            align-items: center;
            font-family: 'Open Sans', sans-serif;
        }
    
        .info_status_entrega {
            width: 85%;
            margin-top: 30px;
            font-size: 13px;
            margin-left: 10px;
            margin-right: 10px;
            font-family: 'Anek Latin', sans-serif;
            color: rgb(118, 114, 114);
        }
    
        .comunication {
            width: 100%;
            margin-top: 30px;
            margin-left: -4%;
            font-size: 13px;
            font-family: 'Anek Latin', sans-serif;
            color: rgb(118, 114, 114);
        }
    </style>
    
    <body class="body">
        <div class="general">
            <div class="header">
                <div class="imagen">
                    <img style="width: 35%;height: 60%;margin: 20px;margin-left: -20px;" src="./img/phyona_blanco.png">
                </div>
            </div>
            <div class="information">
                <!-- BIENVENIDA Y NOMBRE DEL CLIENTE AL QUE SE ENVIARÁ EL CORREO -->
                <div class="welcome">
                    <p class="hello">Hola,</p>
                    <p class="name">`+body.CLIENTE+`</p>
                </div>
                <!-- OBSERVACIONES DEL PEDIDO Y LOS PASOS DEL PEDIDO ONLINE -->
                <div class="pedido_online">
                    <div class="observaciones">
                        <p class="des_obser">Observaciones de tu pedido: </p>
                        <div class="linea_obser">&nbsp;</div>
                    </div>
                    <div class="pasos_online">
                        <div class="desc_pasos">
                            <p class="encuentra">Tu pedido se encuentra:<strong class="state_pedido"> &nbsp; `+`${body.ESTADO == 1 ? 'REGISTRADO' : body.ESTADO == 2 ? 'CONFIRMADO' : body.ESTADO == 3 ? 'EN PROCESO' : 'ENTREGADO'}`+`</strong> </p>
                        </div>
                        <div class="pasitos">
                            <div class="caja_pasos `+`${body.ESTADO  >= 1 ? 'paso_active' : 'paso_desactive'}`+`">
                                <h1 class="nro_paso">1</h1>
                                <div class="description_pasitos">
                                    <div class="circle  `+`${body.ESTADO  >= 1 ? 'circle_activado' : 'circle_desactive'}`+` ">&nbsp;</div>
                                    <h2 class="desc_paso">Pedido Registrado</h2>
                                </div>
                            </div>
                            <div class="caja_pasos `+`${body.ESTADO  >= 2 ? 'paso_active' : 'paso_desactive'}`+`">
                                <h1 class="nro_paso">2</h1>
                                <div class="description_pasitos">
                                    <div class="circle `+`${body.ESTADO  >= 2 ? 'circle_activado' : 'circle_desactive'}`+`">&nbsp;</div>
                                    <h2 class="desc_paso">Pedido Confirmado</h2>
                                </div>
                            </div>
                            <div class="caja_pasos `+`${body.ESTADO  >= 3 ? 'paso_active' : 'paso_desactive'}`+`">
                                <h1 class="nro_paso">3</h1>
                                <div class="description_pasitos">
                                    <div class="circle `+`${body.ESTADO  >= 3 ? 'circle_activado' : 'circle_desactive'}`+`">&nbsp;</div>
                                    <h2 class="desc_paso">Pedido en Proceso</h2>
                                </div>
                            </div>
                            <div class="caja_pasos `+`${body.ESTADO  >= 4 ? 'paso_active' : 'paso_desactive'}`+`">
                                <h1 class="nro_paso">4</h1>
                                <div class="description_pasitos">
                                    <div class="circle `+`${body.ESTADO  >= 4 ? 'circle_activado' : 'circle_desactive'}`+`">&nbsp;</div>
                                    <h2 class="desc_paso">Pedido Entregado</h2>
                                </div>
                            </div>
                        </div>
                        <!--  CONFIRMACIÓN DEL PEDIDO -->
                        <!-- <div class="resumen_pedido">
                                <p class="des_obser">Resumen de tu pedido de tu pedido: </p>
                                <div class="linea_obser">&nbsp;</div>
                                <div class="cuerpo_resumen">
    
                                </div>
                        </div> -->
    
                        <!-- PARA DETALLE DE ENTREGA ... -->
    
                        <div class="info_status_entrega">
                            <div style="margin: 0 auto; width: fit-content; `+`${body.ESTADO  != 2 ? 'display : none' : ''}`+`">
                                <P>DETALLE DE LA ENTREGA:</P>
                                <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:30px' width='100%' cellpadding='0' cellspacing='0'>
                                <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                    <tr>
                                        <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' colspan='2'>
                                            <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' cellpadding='0' cellspacing='0'>
                                                <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                                    <tr>
                                                        <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='40%'>
                                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>PRODUCTO</p>
                                                        </th>
                                                        <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='20%'>
                                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>PRECIO UNIT.</p>
                                                        </th>
                                                        <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='20%'>
                                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>CANT.</p>
                                                        </th>
                                                        <th style='font-family:Verdana,sans-serif;box-sizing:border-box' width='20%'>
                                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:12px;font-weight:600;margin-bottom:8px'>PRECIO TOTAL</p>
                                                        </th>
                                                    </tr>` + productsArray + `
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                                <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:40px' width='100%' cellpadding='0' cellspacing='0'>
                                <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                                    <tr>
                                        <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;font-weight:600'>Descuento</p>
                                        </td>
                                        <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='40%' valign='middle'>
                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:16px;font-weight:600'>S/ ` +
                                    body.DESCUENTO +
                                    `</p>
                                        </td>
                                    </tr>
                                    <tr>
                                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                    <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;font-weight:600'>IGV</p>
                                    </td>
                                    <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='40%' valign='middle'>
                                    <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:16px;font-weight:600'>S/ ` + Number(body.IGV).toFixed(2) + `</p>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='60%' valign='middle'>
                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;font-weight:600'>Total</p>
                                        </td>
                                        <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' width='40%' valign='middle'>
                                            <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:right;margin:0;margin-top:0;font-size:16px;font-weight:600'>S/ ` + body.TOTAL + `</p>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <div style= "`+`${body.ESTADO  < 3 ? 'display : none' : ''}`+`">
                                <P>DETALLE DE LA ENTREGA:</P>
                                <P>DÍA DE LA ENTREGA: <strong style="color: rgb(37, 36, 36)">` +body.FECHA +`</strong></P>
                                <p>DIRECCIÓN DE LA ENTREGA: <strong style="color: rgb(37, 36, 36)">` +getPerson[0].DIRECTION +`</strong></p>
                            </div>
                        </div>
                        <!-- PARA DETALLE DE PEDIDO ERRONEO -->

                        <div class="info_status_entrega"  style ="`+`${body.APROBACION == 1 ? 'display : none' : ''}`+`" >
                            <div style="margin: 0 auto; width: fit-content;"> 
                                <div style="width: 70%; margin: 0 auto; text-align: center; font-size: 13px;">
                                    <p>Por favor, volver a intentar subir el <strong style="color: rgb(37, 36, 36)">voucher o comprobante de pago o realizar de nuevo su pedido</strong>
                                    en nuestra tienda virtual</p>
                                    <p>Si cree que es un error de nuestro sistema, por favor comunicarse al:
                                        <strong style="color: rgb(37, 36, 36)">` +company[0].COM_ORGANIZATION_PHONE_ONE +`</strong> para poder brindarle atención a la brevedad.
                                    </p>
                                </div>
                            </div>
                        </div> 
    
                        <div style ="`+`${body.ESTADO == 4 ? 'display : none' : ''}`+`" class="comunication">
                            <div style="width: 70%; margin: 0 auto; text-align: center;">
                                <p>Nos estaremos comunicando <strong style="color: rgb(37, 36, 36)">via correo
                                        electrónico</strong>
                                    para poder informarle acerca del estado de su pedido</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- EN EL CASO DE CÓDIGO DE CONFIRMACIÓN -->
                <!-- <div class="codigo_confirmacion">
                    <div class="observaciones">
                        <p class="des_obser">Tu código de confirmación es: </p>
                        <div class="linea_obser">&nbsp;</div>
                        <p class="codigo">568379</p>
                    </div>
                    <div class="comunication">
                        <div style="width: 70%; margin: 0 auto; text-align: center;">                            
                            <p>Nos estaremos comunicando <strong style="color: rgb(37, 36, 36)">via correo electrónico</strong>
                            para poder informarle acerca del estado de su pedido</p>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="end">
                <div class="info_contacto">
                    <p style="text-align: center;">¿Tienes dudas o consultas?</p>
                    <p style="text-align: center;">Contáctanos al : <strong>` +company[0].COM_ORGANIZATION_PHONE_ONE +`</strong> </p>
                </div>
            </div>
        </div>
    </body>`
    var path = ''
    logger.info("hola")
    try {
        /* pdf.create(tablaGeneral, options).toBuffer(function (err, result) {
            logger.info(result)
            if (err) {
                logger.info(err)
                res.status(500).json({
                    message: 'Oops, no se pudo enviar el correo.',
                    status: 500,
                })
                return console.log(err);
            }
            else { */
        //logger.info(result)
        //path = result.filename
        // if (body.ESTADO === 4) {
        //     const mailData = {
        //         from: `" ${getPerson[0].COMPANY} " <${process.env.SMTP_USER}>`,
        //         to: body.EMAIL,
        //         subject: 'Aceptación de Voucher',
        //         text: 'Su Voucher a sido aprobado',
        //         html: tablaGeneral,
        //         attachments: [
        //             {
        //                 filename: 'comprobante.pdf',
        //                 path: './public/comprobante.pdf',
        //             }
        //         ]
        //     };
        // }else{
        //     const mailData = {
        //         from: `" ${getPerson[0].COMPANY} " <${process.env.SMTP_USER}>`,
        //         to: body.EMAIL,
        //         subject: 'Aceptación de Voucher',
        //         text: 'Su Voucher a sido aprobado',
        //         html: tablaGeneral
        //     };
        // }


        transporter.sendMail(body.ESTADO === 4 ?
            {
                from: `" ${getPerson[0].COMPANY} " <${process.env.SMTP_USER}>`,
                to: body.EMAIL,
                subject: 'Aceptación de Voucher',
                text: 'Su Voucher a sido aprobado',
                html: tablaGeneral,
                attachments: [
                    {
                        filename: 'comprobante.pdf',
                        path: './public/comprobante.pdf',
                    }
                ]
            }
            
            :
            {
                from: `" ${getPerson[0].COMPANY} " <${process.env.SMTP_USER}>`,
                to: body.EMAIL,
                subject: 'Aceptación de Voucher',
                text: 'Su Voucher a sido aprobado',
                html: tablaGeneral
            }
            
            , (error, info) => {
            if (error) {
                logger.info(error)
                res.status(500).json({
                    message: 'Oops, no se pudo enviar el correo.',
                    status: 500,
                })
            } else {
                pool.query(
                    'UPDATE sv_orders SET ORD_DISPATCHED=ORD_DISPATCHED+1 WHERE ORD_ID=?', [body.PEDIDO],
                    (err, result) => {
                        try {
                            if (result === undefined || result.length == 0) {
                                res.status(404).json({
                                    message: 'No se puede actualizar registros',
                                    status: 404,
                                })
                            } else {
                                res
                                    .status(200)
                                    .json({ message: 'Correo enviado correctamente.', status: 200 })
                            }
                        } catch (error) {
                            logger.info(err)
                            res.status(500).json({
                                message: 'Error de servidor',
                                error: error,
                                status: 500,
                            })
                        }
                    },
                )
            }
        })
    }
    /* 
});*/
    catch (error) {
        logger.info(error)
        res.status(500).json({
            message: 'Oops, no se pudo enviar el correo.',
            error: error,
            status: 500,
        })
    }
}

exports.sendEmailCorreo = async (res, body) => {
    const getSale = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                'SELECT * FROM sv_document WHERE DOC_ID = ?', [body.lastId],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0 || rows == 0) {
                            logger.info(
                                `sendEmailCorreo || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows != 0) {
                            resolve(rows[0])
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }

    const dataSales = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                `SELECT * FROM sv_sales_description where DOC_ID=?`, [body.lastId],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            logger.info(
                                `dataSales || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows.length != 0) {
                            resolve(rows)
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }
    const dataCompany = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(`SELECT * FROM sv_company `, [], (err, rows) => {
                if (!err) {
                    if (rows == undefined || rows.length == 0) {
                        logger.info(
                            `dataCompany || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                        )
                        res.status(500).json({
                            message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                            error: err,
                            status: 500,
                        })
                    } else if (rows.length != 0) {
                        resolve(rows)
                    }
                } else {
                    logger.info(err)
                }
            })
        })
    }
    const sale = await getSale()
    const products = await dataSales()
    const company = await dataCompany()
    let productsArray = ''
    products.forEach((element) => {
        productsArray =
            productsArray +
            '<tr>' +
            '    <td>' +
            element.SDT_CODE +
            '</td>' +
            '    <td>' +
            element.SDT_DESCRIPTION +
            '</td>' +
            '    <td>' +
            element.SDT_AMOUNT +
            '</td>' +
            '    <td>' +
            element.SDT_PRICE.toFixed(2) +
            '</td>' +
            '    <td>' +
            element.SDT_SUBTOTAL.toFixed(2) +
            '</td>' +
            '    <td>' +
            element.SDT_DISCOUNT.toFixed(2) +
            '</td>' +
            '    <td>' +
            element.SDT_TOTAL.toFixed(2) +
            '</td>' +
            '  </tr>'
    })
    let html =
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<style>' +
        'body {' +
        'font-family: arial, sans-serif;' +
        '}' +
        'table {' +
        ' font-family: arial, sans-serif;' +
        'border-collapse: collapse;' +
        'width: 100%;' +
        '}' +
        'td, th {' +
        '  border: 1px solid #dddddd;' +
        'text-align: left;' +
        'padding: 8px;' +
        '}' +
        'tr:nth-child(even) {' +
        'background-color: #dddddd;' +
        '}' +
        '.card {' +
        'box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);' +
        'transition: 0.3s;' +
        'width: 70%;' +
        'margin: 0 auto;' +
        '}' +
        '.card:hover {' +
        'box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);' +
        '}' +
        '.container {' +
        'padding: 2px 16px;' +
        '}' +
        'p {' +
        'text-align:center;' +
        '}' +
        '</style>' +
        '</head>' +
        '<body>' +
        '<div class="card">' +
        '<div class="container">' +
        '<p><b>' +
        company[0].COM_COMPANY_NAME +
        '</b></p>' +
        '<p><b>' +
        company[0].COM_ORGANIZATION_RUC +
        '</b></p>' +
        '<p><b>' +
        company[0].COM_ORGANIZATION_DIRECTION +
        '</p>' +
        '</div>' +
        '</div>' +
        '<div class="card">' +
        '  <div class="container">' +
        '      <p><b>' +
        sale.DOC_DOC_TYPE +
        ' ELECTRONICA</b></p>' +
        '   <p><b>' +
        sale.DOC_SERIE +
        '-' +
        sale.DOC_NUMBER +
        '</b></p>' +
        '    <p><b>Fecha:</b> ' +
        sale.DOC_DATE +
        '</p>' +
        ' </div>' +
        '</div>' +
        '<div class="card">' +
        '  <div class="container">' +
        '    <p><b>' +
        sale.DOC_BUSINESS_NAME +
        '</b></p>' +
        '    <p><b>' +
        sale.DOC_ID_CLIENT +
        '</b></p>' +
        '    <p><b>' +
        sale.DOC_DIRECTION_CLIENT +
        '</b></p>' +
        '  </div>' +
        '</div>' +
        '<table>' +
        '<tr>' +
        '    <th>CODIGO</th>' +
        '    <th>DESCRIPCION</th>' +
        '    <th>CANTIDAD</th>' +
        '    <th>PRECIO UNIT.</th>' +
        '    <th>SUBTOTAL</th>' +
        '    <th>DESCUENTO</th>' +
        '    <th>TOTAL</th>' +
        '  </tr>' +
        productsArray +
        '</table>' +
        '<div class="card">' +
        ' <div class="container">' +
        '   <p><b>SUBTOTAL:</b> ' +
        sale.DOC_SUBTOTAL.toFixed(2) +
        '</p> ' +
        '   <p><b>DESCUENTO:</b> ' +
        sale.DOC_DISCOUNT.toFixed(2) +
        '</p> ' +
        '   <p><b>GRAVADA:</b> ' +
        sale.DOC_TAXED.toFixed(2) +
        '</p> ' +
        '   <p><b>EXONERADA:</b> ' +
        sale.DOC_RELEASED.toFixed(2) +
        '</p> ' +
        '    <p><b>INAFECTA:</b> ' +
        sale.DOC_INAFECT.toFixed(2) +
        '</p> ' +
        '    <p><b>IGV:</b> ' +
        sale.DOC_IGV.toFixed(2) +
        '</p> ' +
        '    <p><b>TOTAL:</b> ' +
        sale.DOC_NETO.toFixed(2) +
        '</p> ' +
        '    <h4>SON: ' +
        sale.DOC_NETO.toFixed(2) +
        ' con 0/100 soles</h4>' +
        '  </div>' +
        '</div>' +
        '</body>' +
        '</html>'

    const mailData = {
        from: `"${sale.DOC_BUSINESS_NAME}" <${process.env.SMTP_USER}>`,
        to: body.correo,
        subject: 'Comprobante',
        text: 'Envío de comprobante',
        html: html,
    }

    try {
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                logger.info(error)
                res.status(500).json({
                    message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
                    error: error,
                    status: 500,
                })
            } else {
                res
                    .status(200)
                    .json({ message: 'Correo enviado.', message_id: info.messageId })
            }
        })
    } catch (error) {
        logger.info(error)
        res.status(500).json({
            message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
        })
    }
}

exports.sendEmailOrder = async (res, body) => {
    const dataPerson = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                `SELECT COM.COM_ORGANIZATION_LOGO AS LOGO, COM.COM_COMPANY_NAME AS COMPANY, 
                 COM.COM_ORGANIZATION_DIRECTION AS DIRECTION 
                 FROM sv_company AS COM WHERE COM.COM_ID = ?`, [2],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            logger.info(
                                `dataPerson || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows.length != 0) {
                            resolve(rows)
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }

    const getPerson = await dataPerson()

    var html = `<table class='m_7441485788288210047email-body' style='font-family:Verdana,sans-serif;box-sizing:border-box;width:600px;margin:0 auto;padding:0;background-color:#fff' align='center' width='600' cellpadding='0' cellspacing='0'>
    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
        <tr>
            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' height='5px' cellspacing='0'>
                    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                        <tr>
                            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' bgcolor='#24468A'></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;padding:24px'>
                <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:24px' width='100%' cellpadding='0' cellspacing='0'>
                    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                        <tr>
                            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                                <a style='font-family:Verdana,sans-serif;box-sizing:border-box;color:#3869d4' href='` + process.env.URI_FRONT + `' target='_blank'>
                                    <img style='font-family:Verdana,sans-serif;box-sizing:border-box;border:none;max-width:100%' alt='` + getPerson[0].COMPANY + ` - ' src='` + "https://www.gallinitadecorral.com:4000/upload/logo%20correo.jpg" + `' height='60' class='CToWUd'>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;margin-bottom:8px;font-size:28px;font-weight:400;text-align:left'>¡Hola ` + body.nombre + `!</h1>
                <div style='font-family:Verdana,sans-serif;box-sizing:border-box;height:24px'></div> 
                <h2 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;font-size:16px;font-weight:600;text-align:left;padding-bottom:8px;border-bottom:1px solid #a5a5bd;margin-bottom:16px'>Observaciones de tu pedido</h2>
                <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;margin-bottom:16px'>1) Tu pedido se encuentra ` + body.estadoOrden + `.</p>
            </td>
        </tr>

    </tbody>
</table>`
    const mailData = {
        from: `"${getPerson[0].COMPANY}" <${process.env.SMTP_USER}>`,
        to: body.correo,
        subject: 'Comprobante',
        text: 'Envío de comprobante',
        html: html,
    }
    try {
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                logger.info(error)
                res.status(500).json({
                    message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
                    error: error,
                    status: 500,
                })
            } else {
                res
                    .status(200)
                    .json({ message: 'Correo enviado.', message_id: info.messageId })
            }
        })
    } catch (error) {
        logger.info(error)
        res.status(500).json({
            message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
        })
    }
}

exports.sendEmailContactanos = async (res, body) => {
    const dataPerson = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                `SELECT COM.COM_ORGANIZATION_LOGO AS LOGO, COM.COM_COMPANY_NAME AS COMPANY, 
                 COM.COM_ORGANIZATION_DIRECTION AS DIRECTION 
                 FROM sv_company AS COM WHERE COM.COM_ID = ?`, [2],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            logger.info(
                                `dataPerson || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows.length != 0) {
                            resolve(rows)
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }

    const getPerson = await dataPerson()

    var html = `<table class='m_7441485788288210047email-body' style='font-family:Verdana,sans-serif;box-sizing:border-box;width:600px;margin:0 auto;padding:0;background-color:#fff' align='center' width='600' cellpadding='0' cellspacing='0'>
    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
        <tr>
            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' height='5px' cellspacing='0'>
                    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                        <tr>
                            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' bgcolor='#24468A'></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;padding:24px'>
                <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:24px' width='100%' cellpadding='0' cellspacing='0'>
                    <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                        <tr>
                            <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                                <a style='font-family:Verdana,sans-serif;box-sizing:border-box;color:#3869d4' href='` + process.env.URI_FRONT + `' target='_blank'>
                                    <img style='font-family:Verdana,sans-serif;box-sizing:border-box;border:none;max-width:100%' alt='` + getPerson[0].COMPANY + ` - ' src='` + "https://www.gallinitadecorral.com:4000/upload/logo%20correo.jpg" + `' height='60' class='CToWUd'>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;margin-bottom:8px;font-size:28px;font-weight:400;text-align:left'>¡Tenemos un Nuevo Interesado: ` + body.nombre + `!</h1>
                <div style='font-family:Verdana,sans-serif;box-sizing:border-box;height:24px'></div> 
                <h2 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;font-size:16px;font-weight:600;text-align:left;padding-bottom:8px;border-bottom:1px solid #a5a5bd;margin-bottom:16px'>Nos Comenta:</h2>
                <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;margin-bottom:16px'>` + body.descripcion + `.</p>
            </td>
        </tr>
    </tbody>
</table>`
    const mailData = {
        from: body.correo,
        to: `"${getPerson[0].COMPANY}" <${process.env.SMTP_USER}>`,
        subject: body.asunto,
        text: body.asunto,
        html: html,
    }
    try {
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                logger.info(error)
                res.status(500).json({
                    message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
                    error: error,
                    status: 500,
                })
            } else {
                res
                    .status(200)
                    .json({ message: 'Correo enviado.', message_id: info.messageId })
            }
        })
    } catch (error) {
        logger.info(error)
        res.status(500).json({
            message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
        })
    }
}

exports.rejectedvoucher = async (res, body) => {

    const dataPerson = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                `SELECT CONCAT(PE.PER_NAME, " ", PE.PER_LASTNAME) AS PERSON, PE.PER_DNI AS DNI, PE.PER_RUC AS RUC,
              COM.COM_ORGANIZATION_LOGO AS LOGO, COM.COM_COMPANY_NAME AS COMPANY, COM.COM_ORGANIZATION_DIRECTION AS DIRECTION
             FROM sv_person AS PE, sv_orders AS ORS, sv_client AS CL, sv_company AS COM
             WHERE ORS.CLI_ID = CL.CLI_ID AND PE.PER_ID = CL.PER_ID AND ORS.ORD_ID = ? AND COM.COM_ID = ?`, [body.PEDIDO, 2],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            logger.info(
                                `dataPerson || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows.length != 0) {
                            resolve(rows)
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }

    const getPerson = await dataPerson()

    let tablaGeneral =
        `<table class='m_7441485788288210047email-body' style='font-family:Verdana,sans-serif;box-sizing:border-box;width:600px;margin:0 auto;padding:0;background-color:#fff' align='center' width='600' cellpadding='0' cellspacing='0'>
      <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
          <tr>
              <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                  <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' height='5px' cellspacing='0'>
                      <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                          <tr>
                              <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' bgcolor='#24468A'></td>
                          </tr>
                      </tbody>
                  </table>
              </td>
          </tr>
          <tr>
              <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;padding:24px'>
                  <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:24px' width='100%' cellpadding='0' cellspacing='0'>
                      <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                          <tr>
                              <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                                  <a style='font-family:Verdana,sans-serif;box-sizing:border-box;color:#3869d4' href='` + process.env.URI_FRONT + `' target='_blank'>
                                      <img style='font-family:Verdana,sans-serif;box-sizing:border-box;border:none;max-width:100%' alt='` + getPerson[0].COMPANY + ` - ' src='` + "https://www.gallinitadecorral.com:4000/upload/logo%20correo.jpg" + `' height='60' class='CToWUd'>
                                  </a>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <h1 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;margin-bottom:8px;font-size:28px;font-weight:400;text-align:left'>¡Hola ` + body.CLIENTE + `!</h1>
                  <div style='font-family:Verdana,sans-serif;box-sizing:border-box;height:24px'></div> 
                  <h2 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;font-size:16px;font-weight:600;text-align:left;padding-bottom:8px;border-bottom:1px solid #a5a5bd;margin-bottom:16px'>Observaciones de tu pedido</h2>
                  <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;margin-bottom:16px'>1) Tu pedido se encuentra registrado.</p>
                  <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;margin-bottom:16px'>2) Tu voucher a sido rechazado.</p>
              </td>
          </tr>

      </tbody>
  </table>`

    const mailData = {
        from: `" ${getPerson[0].COMPANY} " <${process.env.SMTP_USER}>`,
        to: body.EMAIL,
        subject: 'Voucher Rechazado',
        text: 'Su Voucher a sido rechazado',
        html: tablaGeneral,
    }

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            logger.info(error)
            logger.info(info)
            res.status(500).json({
                message: 'Oops, no se pudo enviar el correo.',
                status: 500,
            })
        } else {
            logger.info(info)
            res.status(200).json({
                message: 'Se comunico al usuario.',
                status: 200,
            })
        }

    })
}
exports.sendEmailCodigo = async (res, body) => {
    console.log(body)
    const dataPerson = () => {
        return new Promise((resolve) => {
            mysqlConnection.query(
                `SELECT COM.COM_ORGANIZATION_LOGO AS LOGO, COM.COM_COMPANY_NAME AS COMPANY, 
                 COM.COM_ORGANIZATION_DIRECTION AS DIRECTION 
                 FROM sv_company AS COM WHERE COM.COM_ID = ?`, [2],
                (err, rows) => {
                    if (!err) {
                        if (rows == undefined || rows.length == 0) {
                            logger.info(
                                `dataPerson || rows == undefined || rows.length == 0 || rows == 0 : ${err} `,
                            )
                            res.status(500).json({
                                message: 'Oops, Error al obtener la data para el envio del Email. Intentelo mas tarde.',
                                error: err,
                                status: 500,
                            })
                        } else if (rows.length != 0) {
                            resolve(rows)
                        }
                    } else {
                        logger.info(err)
                    }
                },
            )
        })
    }

    const getPerson = await dataPerson()
    let html =
        `<table class='m_7441485788288210047email-body' style='font-family:Verdana,sans-serif;box-sizing:border-box;width:600px;margin:0 auto;padding:0;background-color:#fff' align='center' width='600' cellpadding='0' cellspacing='0'>
        <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
            <tr>
                <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                    <table style='font-family:Verdana,sans-serif;box-sizing:border-box' width='100%' height='5px' cellspacing='0'>
                        <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                            <tr>
                                <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word' bgcolor='#24468A'></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word;padding:24px'>
                    <table style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-bottom:24px' width='100%' cellpadding='0' cellspacing='0'>
                        <tbody style='font-family:Verdana,sans-serif;box-sizing:border-box'>
                            <tr>
                                <td style='font-family:Verdana,sans-serif;box-sizing:border-box;word-break:break-word'>
                                    <a style='font-family:Verdana,sans-serif;box-sizing:border-box;color:#3869d4' href='` + process.env.URI_FRONT + `' target='_blank'>
                                        <img style='font-family:Verdana,sans-serif;box-sizing:border-box;border:none;max-width:100%'  +  - ' src='` + "https://www.gallinitadecorral.com:4000/upload/logo%20correo.jpg" + `' height='60' class='CToWUd'>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;margin-bottom:8px;font-size:28px;font-weight:400;text-align:left'>¡hola, ` + body.usuario + `!</h1>
                    <div style='font-family:Verdana,sans-serif;box-sizing:border-box;height:24px'></div> 
                    <h2 style='font-family:Verdana,sans-serif;box-sizing:border-box;margin-top:0;font-size:16px;font-weight:600;text-align:left;padding-bottom:8px;border-bottom:1px solid #a5a5bd;margin-bottom:16px'>Tu codigo de confimracion es:</h2>
                    <p style='font-family:Verdana,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;margin:0;margin-top:0;font-size:16px;margin-bottom:16px'>` + body.codigo + `.</p>
                </td>
            </tr>
        </tbody>
    </table>`

    const mailData = {
        from: `"${getPerson[0].COMPANY}" <${process.env.SMTP_USER}>`,
        to: body.correo,
        subject: 'Codigo de Verificacion',
        text: 'Envío de codigo de verificacion',
        html: html,
    }

    try {
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                logger.info(error)
                res.status(500).json({
                    message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
                    error: error,
                    status: 500,
                })
            } else {
                res
                    .status(200)
                    .json({ message: 'Correo enviado.', message_id: info.messageId })
            }
        })
    } catch (error) {
        logger.info(error)
        res.status(500).json({
            message: 'Oops, Error al enviar el email. Intentelo mas tarde.',
        })
    }
}
