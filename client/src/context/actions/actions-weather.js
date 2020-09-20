import { API } from '../store/store';
import axios from 'axios';
import moment from 'moment';
import {
  updateError,
  updateLocalWeather,
  updateCities,
} from '../reducers/weather-reducer';

export const getLocalWeather = () => (dispath, getState) => {
  const { units, lang } = getState().weatherReducer;
  axios
    .get(`${API}/location/`, {
      params: {
        units,
        lang,
      },
    })
    .then((currentWeather) => {
      axios
        .get(`${API}/forecast/`, {
          params: {
            units,
            lang,
          },
        })
        .then((currentForecast) => {
          let listDays = currentForecast.data.list;
          let days = {};
          for (let i = 0; i < listDays.length; i++) {
            if (
              moment(listDays[i].dt_txt).format('D') !== moment().format('D')
            ) {
              let day = moment(listDays[i].dt_txt).format('M[/]D');
              if (days[day] === undefined) days[day] = {};
              if (days[day].max === undefined) days[day].max = 0;
              days[day].max =
                listDays[i].main.temp_max >= days[day].max
                  ? listDays[i].main.temp_max
                  : days[day].max;
              if (days[day].min === undefined) days[day].min = 1000;
              days[day].min =
                listDays[i].main.temp_min <= days[day].min
                  ? listDays[i].main.temp_min
                  : days[day].min;
            }
          }
          dispath(
            updateLocalWeather({
              localWeather: currentWeather.data,
              localForecast: days,
            })
          );
        })
        .catch((err) => {
          dispath(updateError(true));
        });
    })
    .catch((err) => {
      dispath(updateError(true));
    });
};

export const getCityWeather = (search, index) => async (dispath, getState) => {
  const { units, lang, cities } = getState().weatherReducer;
  let cityWeather = await getWeather(search, { units, lang });
  if (cityWeather === 'error') {
    dispath(updateError(true));
  } else {
    const newCities = [...cities];
    if (typeof index === 'number') {
      newCities[index] = cityWeather;
    } else {
      newCities.push(cityWeather);
    }
    dispath(updateCities(newCities));
  }
};

export const updateCitiesWeather = () => async (dispath, getState) => {
  const { units, lang, cities } = getState().weatherReducer;
  let promises = [...cities].map(
    (city) =>
      new Promise(async (resolve, reject) => {
        const search = city.currentWeather.name;
        let newWeather = await getWeather(search, { units, lang });
        if (newWeather === 'error') reject('error');
        resolve(newWeather);
      })
  );
  Promise.all(promises).then((newWeathers) => {
    if (newWeathers.includes('error')) dispath(updateError(true));
    dispath(updateCities(newWeathers));
  });
};

const getWeather = async (search, params) => {
  let weather = await axios
    .get(`${API}/current/${search}`, {
      params,
    })
    .then(async (currentWeather) => {
      return await axios
        .get(`${API}/forecast/${search}`, {
          params,
        })
        .then((currentForecast) => {
          let listDays = currentForecast.data.list;
          let days = {};
          for (let i = 0; i < listDays.length; i++) {
            if (
              moment(listDays[i].dt_txt).format('D') !== moment().format('D')
            ) {
              let day = moment(listDays[i].dt_txt).format('M[/]D');
              if (days[day] === undefined) days[day] = {};
              if (days[day].max === undefined) days[day].max = 0;
              days[day].max =
                listDays[i].main.temp_max >= days[day].max
                  ? listDays[i].main.temp_max
                  : days[day].max;
              if (days[day].min === undefined) days[day].min = 1000;
              days[day].min =
                listDays[i].main.temp_min <= days[day].min
                  ? listDays[i].main.temp_min
                  : days[day].min;
            }
          }
          return {
            currentWeather: currentWeather.data,
            currentForecast: days,
          };
        })
        .catch((err) => {
          return 'error';
        });
    })
    .catch((err) => {
      return 'error';
    });
  return weather;
};

export const deleteCity = (index) => (dispath, getState) => {
  const cities = [...getState().weatherReducer.cities];
  cities.splice(index, 1);
  dispath(updateCities(cities));
};
