const express = require("express");
const router = express.Router();
const email = require("../model/send_email.model");

// Send Mail
router.post("/sendmailsaleonline/", async(req, res) => {
    email.voucherAcepted(res, req.body);
});

//Send mail Sale
router.post("/saleemail/", async(req, res) => {
    email.sendEmailCorreo(res, req.body);
});

// Send voucher rejected
router.post("/rejectedvoucher/", async(req, res) => {
    email.rejectedvoucher(res, req.body);
});

// Send voucher rejected
router.post("/orderUpdate/", async(req, res) => {
    email.sendEmailOrder(res, req.body);
});
// Send voucher rejected
router.post("/sendEmailContactanos/", async(req, res) => {
    email.sendEmailContactanos(res, req.body);
});

module.exports = router;