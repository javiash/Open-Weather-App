import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCity,
  getCityWeather,
  updateCitiesWeather,
} from '../../context/actions/actions-weather';
import WeatherCard from '../weatherCard/weatherCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import './cities.scss';
import { updateError } from '../../context/reducers/weather-reducer';

export default function Cities() {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const cities = useSelector((state) => state.weatherReducer.cities);
  const units = useSelector((state) => state.weatherReducer.units);
  const lang = useSelector((state) => state.weatherReducer.lang);
  const error = useSelector((state) => state.weatherReducer.error);
  const currentWeather = useSelector(
    (state) => state.weatherReducer.currentWeather
  );
  const { localWeather } = currentWeather;
  const addCityRef = useRef(null);

  useEffect(() => {
    dispatch(updateCitiesWeather());
  }, [dispatch, units, lang]);

  const closeError = useCallback(() => {
    dispatch(updateError(false));
  }, [dispatch]);

  useEffect(() => {
    error &&
      setShowError(
        <div className='error-black'>
          <div className='error-show'>
            {lang === 'es'
              ? 'Hubo un error en su pedido. Revise la ciudad ingresada. De lo contrario intente nuevamente en unos momentos.'
              : lang === 'en'
              ? 'There was an error in your request. Check the city entered. Otherwise try again in a few moments.'
              : "Une erreur s'est produite dans votre commande. Vérifiez la ville saisie. Sinon, réessayez dans quelques instants."}
            <button onClick={closeError}>
              {lang === 'es' ? 'Cerrar' : lang === 'en' ? 'Close' : 'Fermer'}{' '}
            </button>
          </div>
        </div>
      );
    !error && setShowError(null);
  }, [closeError, error, lang]);

  const changeCity = (newCity, i) => {
    dispatch(getCityWeather(newCity, i));
  };

  const addCity = (e) => {
    if (e.key === 'Enter') {
      dispatch(getCityWeather(addCityRef.current.value));
    }
  };

  const deleteCard = (index) => {
    dispatch(deleteCity(index));
  };

  if (!localWeather) return null;
  return (
    <>
      {showError}
      <div className='cities-body'>
        <div className='cities-weather'>
          {cities.map((city, i) => {
            return (
              <WeatherCard
                key={i}
                index={i}
                weather={city}
                changeCity={changeCity}
                deleteCard={deleteCard}
              />
            );
          })}
          {cities.length <= 4 ? (
            <div className='cities-add'>
              <input
                className='cities-input'
                ref={addCityRef}
                type='text'
                placeholder='Ciudad/City/Ville'
                onKeyPress={addCity}
              />
              <FontAwesomeIcon color='white' size='4x' icon={faPlusCircle} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
