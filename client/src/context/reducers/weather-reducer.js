import { createSlice } from '@reduxjs/toolkit';

const versionSlice = createSlice({
  name: 'weather',
  initialState: {
    error: false,
    units: 'metric',
    lang: 'es',
    currentWeather: {},
    cities: [],
  },
  reducers: {
    updateError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateUnits(state, action) {
      state.units = action.payload;
    },
    updateLang(state, action) {
      state.lang = action.payload;
    },
    updateLocalWeather(state, action) {
      state.currentWeather = {
        localWeather: action.payload.localWeather,
        localForecast: action.payload.localForecast,
      };
      state.loading = false;
    },
    updateCities(state, action) {
      state.cities = action.payload;
    },
  },
});

const { actions, reducer } = versionSlice;

export const {
  updateError,
  updateLang,
  updateUnits,
  updateLocalWeather,
  updateCities,
} = actions;

export default reducer;
