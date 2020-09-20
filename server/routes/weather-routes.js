const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.API_KEY || 'dbcdb0230ee55add899aa3fd9e3adc0c';

const getIPCity = async () => {
  return await axios
    .get('http://ip-api.com/json/')
    .then((localData) => {
      const { city, timezone } = localData.data;
      const cityAlt = timezone?.split('/')[2];
      return (currentCity = cityAlt || city);
    })
    .catch((err) => {
      return;
    });
};

const getWeather = async (weather, params) => {
  return await axios
    .get(
      `http://api.openweathermap.org/data/2.5/${weather}?&appid=${API_KEY}`,
      {
        params: {
          lang: 'es',
          units: 'metric',
          ...params,
        },
      }
    )
    .then((weatherData) => {
      return { status: weatherData.status, data: weatherData.data };
    })
    .catch((err) => {
      return { status: err.response ? err.response.data.cod : 404, data: err };
    });
};

router.get('/location', async (req, res) => {
  const city = await getIPCity();
  const weather = await getWeather('weather', { q: city, ...req.query });
  res.status(weather.status).send(weather.data);
});

router.get('/current/:city*?', async (req, res) => {
  let city = req.params.city?.replace(/-/g, ' ');
  if (!city) city = await getIPCity();
  const weather = await getWeather('weather', { q: city, ...req.query });
  res.status(weather.status).send(weather.data);
});

router.get('/forecast/:city*?', async (req, res) => {
  let city = req.params.city?.replace(/-/g, ' ');
  if (!city) city = await getIPCity();
  let forecast = await getWeather('forecast', { q: city, ...req.query });
  res.status(forecast.status).send(forecast.data);
});

module.exports = router;
