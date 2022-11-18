const express = require("express");
const router = express.Router();
const here = require("./reports.documents.model");
const { verifyToken } = require('../../../lib/middleware/verify.middleware');

// router.get("/person", verifyToken, async(req, res) => {
router.get("/emits", async(req, res) => {
    here.reportDocumentsEmits(res);
});

router.get("/payvsemit", async(req, res) => {
    here.reportDocumentsEmitReport(res);
});

module.exports = router;
