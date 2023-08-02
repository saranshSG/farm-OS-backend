const express = require("express");
const authRoute = require("./auth.route");
const sensorRoute = require("./sensor.route");
const weatherRoute = require("./weather.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/sensor",
    route: sensorRoute,
  },
  {
    path: "/weather",
    route: weatherRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
