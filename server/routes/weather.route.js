const express = require("express");
const weatherController = require("../controllers/weather.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

///api/weather/getCurrent
router.get("/getCurrent", weatherController.getCurrentWeather);

module.exports = router;
