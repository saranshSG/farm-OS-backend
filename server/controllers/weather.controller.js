const { ApiError } = require("../middlewares/apiError");
const axios = require("axios");
const httpStatus = require("http-status");

const weatherController = {
  async getCurrentWeather(req, res, next) {
    try {
      const lat = req.query.lat;
      const lon = req.query.lon;

      let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.open_weather_key}&units=imperial`;
      const response = await axios.get(BASE_URL);

      let data = [
        {
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
          pressure: response.data.main.pressure,
          wind_speed: response.data.wind.speed,
          wind_direction: response.data.wind.deg,
          icon: response.data.weather[0].icon,
        },
      ];

      res.send(data);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = weatherController;
