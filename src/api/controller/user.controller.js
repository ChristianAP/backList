const express = require("express");
const router = express.Router();
const { encode } = require("../../lib/middleware/mask.middleware");
const here = require("../model/user.model");
const { verifyToken } = require('../../lib/middleware/verify.middleware');
// Get all
router.get("/", async(req, res) => {
    here.read(res);
});

// Get all
router.post("/validateUser", async(req, res) => {
    here.validateUser(req.body.USR_USER,res);
});

// Change Password
router.patch("/change/password", verifyToken, async(req, res) => {
    req.body.USR_PASSWORD2 = await encode(req.body.USR_PASSWORD2);
    here.changePassword(res, req.body, req.data.USR_ID);
});

// Get for tickets
router.get("/fortickets", async(req, res) => {
    here.readForTicket(res);
});

// Get All Clientes
router.get("/users", async(req, res) => {
    here.readClientsAndVendors(res);
});

// Search Person
router.get("/search/:param", async(req, res) => {
    const { param } = req.params;
    here.searchPerson(res, param);
});

// Search Conductor
router.get("/driver/:param", async(req, res) => {
    const { param } = req.params;
    here.searchDriver(res, param);
});

// Get one
router.get("/:param", async(req, res) => {
    const { param } = req.params;
    here.readByOne(res, param);
});

// Create new
router.post("/", async(req, res) => {
    req.body.USR_PASSWORD = await encode(req.body.USR_PASSWORD);
    req.body.USR_STATUS = "1";
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

router.patch("/forgot/password", async(req, res) => {
    console.log(req.body.password);
    req.body.password = await encode(req.body.password);
    here.forgotPassword(res, req.body);
});
module.exports = router;