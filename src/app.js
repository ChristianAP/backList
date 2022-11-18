require("dotenv").config();
const path = require("path");
// const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formData = require("express-form-data");
const { notFound, errorHandler } = require("./lib/middleware/error.middleware");
const { corsMiddleware } = require("./lib/middleware/cors.middleware");

const app = express();

if (process.env.NODE_ENV != "production") {
    app.use(morgan("dev"));
} else {
    require("dotenv").config();
    app.use(morgan("combined"));
}

app.use(formData.parse());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(corsMiddleware);

app.use(cookieParser());

app.use("/access", require("./api/controller/access.controller"));
app.use("/access_rol", require("./api/controller/access_rol.controller"));
app.use("/buy", require("./api/controller/buy.controller"));
app.use("/category", require("./api/controller/category.controller"));
app.use("/clasification", require("./api/controller/clasification.controller"));
app.use("/client", require("./api/controller/client.controller"));
//configuration
app.use("/configuration", require("./api/controller/configuration.controller"));
app.use("/caja", require("./api/controller/cash_controller"));
app.use("/caja_detalle", require("./api/controller/cash_detail.controller"));
app.use("/config", require("./api/controller/config.controller")); 
app.use("/product_config_detail", require("./api/controller/product_config_detail.controller"));
app.use("/codebar_config", require("./api/controller/codebar_config.controller"));

app.use("/company", require("./api/controller/company.controller"));
app.use("/discounts", require("./api/controller/discounts.controller"));
app.use(
    "/discount_detail",
    require("./api/controller/discount_detail.controller")
);
app.use("/document_type", require("./api/controller/document_type.controller"));
app.use("/document", require("./api/controller/document.controller"));
app.use("/evidence", require("./api/controller/evidence.controller"));
app.use("/exchange_rate", require("./api/controller/exchange_rate.controller"));
app.use("/external_products", require("./api/controller/external_products.controller"));
app.use("/group", require("./api/controller/group.controller"));
app.use(
    "/history_ticket",
    require("./api/controller/history_ticket.controller")
);
app.use("/kardex", require("./api/controller/kardex.controller"));
app.use("/list_price", require("./api/controller/list_price.controller"));
app.use("/login", require("./api/controller/login.controller"));
app.use("/logs", require("./api/controller/logs.controller"));
app.use("/mail", require("./api/controller/sendmail.controller"));
app.use("/message", require("./api/controller/message.controller"));
app.use("/metodo_pago", require("./api/controller/metodo_pago.controller"));
app.use("/orders", require("./api/controller/order.controller"));
app.use("/order_type", require("./api/controller/order_type.controller"));
app.use("/order_details", require("./api/controller/order_details.controller"));
app.use(
    "/payment_method",
    require("./api/controller/payment_method.controller")
);
app.use("/person", require("./api/controller/person.controller"));
app.use("/person_type", require("./api/controller/person_type.controller"));
app.use("/point_sale", require("./api/controller/point_sale.controller"));
app.use("/us_point", require("./api/controller/us_point.controller"));
app.use("/pasos_online", require("./api/controller/order_steps.controller"));
app.use(
    "/product_details",
    require("./api/controller/product_details.controller")
);
app.use("/product", require("./api/controller/product.controller"));
app.use("/promotion", require("./api/controller/promotion.controller"));
app.use("/provider", require("./api/controller/provider.controller"));
app.use("/rol", require("./api/controller/rol.controller"));
app.use("/remission", require("./api/controller/remission.controller"));
app.use("/remission_details", require("./api/controller/remission_details.controller"));
app.use("/sale_type", require("./api/controller/sale_type.controller"));
app.use(
    "/sales_description",
    require("./api/controller/sales_description.controller")
);
app.use("/sales", require("./api/controller/sales.controller"));
app.use("/status_ticket", require("./api/controller/status_ticket.controller"));
app.use("/stock", require("./api/controller/stock.controller"));
app.use("/stock_details", require("./api/controller/stock_details.controller"));
app.use("/ticket", require("./api/controller/ticket.controller"));
app.use("/template", require("./api/controller/template.controller"));
app.use("/temporary", require("./api/controller/temporary_alerts.controller"));
app.use("/type_ticket", require("./api/controller/type_ticket.controller"));
app.use("/user_access", require("./api/controller/user_access.controller"));
app.use("/upload", express.static(path.join(__dirname, "../upload")));
app.use("/user_rol", require("./api/controller/user_rol.controller"));
app.use("/user", require("./api/controller/user.controller"));
app.use("/us_point", require("./api/controller/us_point.controller"));
app.use("/voucher", require("./api/controller/voucher.controller"));
//  EXTERNAL
app.use("/external/reniec", require("./api/external/reniec/reniec.controller"));
app.use("/external/sunat", require("./api/external/sunat/sunat.controller"));
app.use("/external/whatsapp", require("./api/external/whatsapp/whatsapp.controller"));

// REPORTS
app.use("/report/documents", require("./api/reports/documents/reports.documents.controller"));
app.use("/report/sales", require("./api/reports/sales/reports.sales.controller"));

// LOGS
app.use("/logs", require("./utils/logger.utils"));

app.use(notFound);
app.use(errorHandler);
module.exports = app;
