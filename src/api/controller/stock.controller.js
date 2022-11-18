const express = require("express");
const { dateForOperationsInDB } = require("../../lib/globals/date.global");
const router = express.Router();
const here = require("../model/stock.model");

// Get all
router.get("/", async(req, res) => {
    here.read(res);
});

// Get one
router.get("/productId/:param", async(req, res) => {
    const { param } = req.params;
    here.readStockByProduct(res, param);
});

// Get one
router.get("/stockId/:param", async(req, res) => {
    const { param } = req.params;
    here.stockDetailByStockId(res, param);
});

// Get one
router.get("/:param", async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post("/", async(req, res) => {
    req.body.STK_STATUS = "1";
    req.body.STK_DATE_UPGRADE = await dateForOperationsInDB();
    here.create(req.body, res);
});

// Edit
router.patch("/:param", async(req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Delete
router.delete("/:param", async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;