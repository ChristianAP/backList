const express = require("express");
const router = express.Router();
const here = require("./reports.sales.model");
const { verifyToken } = require('../../../lib/middleware/verify.middleware');

router.get("/earnings", async(req, res) => {
    here.reportEarnings(res);
});

router.get("/sales", async(req, res) => {
    here.reportSalesByMoths(res);
});

module.exports = router;
