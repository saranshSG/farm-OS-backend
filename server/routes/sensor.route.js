const express = require("express");
const sensorController = require("../controllers/iotDynamo.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/sensor/getData
router.get("/getData", sensorController.getData);

module.exports = router;
