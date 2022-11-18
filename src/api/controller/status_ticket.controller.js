const express = require("express");
const router = express.Router();
const here = require("../model/status_ticket.model");

// Get status for tickets
router.get("/status/", async(req, res) => {
    here.status(res);
});

// Get all
router.get("/", async(req, res) => {
    here.read(res);
});

// Get one
router.get("/:param", async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post("/", async(req, res) => {
    req.body.TTC_STATUS = "1";
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