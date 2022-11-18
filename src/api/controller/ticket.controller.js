const express = require("express");
const {
    onlyDate,
    onlyTime,
    dateAndHour,
    dateForOperationsInDB,
    dateAndHourForOperationsInDB,
} = require("../../lib/globals/date.global");
const router = express.Router();
const here = require("../model/ticket.model");
const { verifyToken } = require('../../lib/middleware/verify.middleware');
// Get all
router.get("/", async(req, res) => {
    here.readAllTicket(res);
});

// Get all
router.get("/alert/statusopen", async(req, res) => {
    here.alertTicketStatusOpen(res);
});

// Get acord status
router.get("/status/:param", async(req, res) => {
    const { param } = req.params;
    if (param == 1) {
        here.readAcordeStatus(res, param);
    } else if (param == 2 || param == 3 || param == 4) {
        here.readOtherStatus(res, param);
    } else if (param == 5) {
        here.readSinResolver(res, param);
    }
});

//readAcordeStatusByPersinId
router.get("/person", verifyToken, async(req, res) => {
    const id = req.data.PER_ID;
    here.readAcordeStatusByPersinId(res, id);
});

// Get one
router.get("/getone/:param", async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Get all
router.get("/getbyreport/reportcircular", async(req, res) => {
    here.readByCircularReport(res);
});

// Get all
router.get("/getbyreport/reportweek", async(req, res) => {
    here.readByWeekReport(res);
});

// Get all
router.get("/getbyreport/reportuser", async(req, res) => {
    here.readByUserReport(res);
});

// Create new
router.post("/", async(req, res) => {
    req.body.TCK_REQUEST_DATE = await dateForOperationsInDB();
    req.body.TCK_REQUEST_HOUR = await onlyTime();
    req.body.TCK_STATUS = "1";
    here.create(req.body, res);
});

router.post("/tienda/online", verifyToken, async(req, res) => {
    req.body.TCK_REQUEST_DATE = await dateForOperationsInDB();
    req.body.TCK_REQUEST_HOUR = await onlyTime();
    req.body.TCK_STATUS = "1";
    req.body.PER_ID = req.data.PER_ID
    here.create(req.body, res);
    //res.send('asd');
});
// Edit
router.patch("/update/:param", async(req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Edit Status
router.patch("/editstatus/:param", async(req, res) => {
    const { param } = req.params;
    here.updateOne(res, req.body, param);
});

// Update Start Hour
router.patch("/viewhour/:param", async(req, res) => {
    const { param } = req.params;
    req.body.TCK_VIEW_HOUR = await dateAndHourForOperationsInDB();
    here.updateViewHour(res, req.body, param);
});

// Delete
router.delete("/:param", async(req, res) => {
    const { param } = req.params;
    here.deleteOne(res, param);
});

module.exports = router;