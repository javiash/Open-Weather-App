import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalWeather } from '../../context/actions/actions-weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUndo,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import './currentCity.scss';

export default function CurrentCity() {
  const dispatch = useDispatch();
  const currentWeather = useSelector(
    (state) => state.weatherReducer.currentWeather
  );
  const units = useSelector((state) => state.weatherReducer.units);
  const lang = useSelector((state) => state.weatherReducer.lang);

  const { localWeather, localForecast } = currentWeather;
  const days = localForecast && Object.keys(localForecast);

  useEffect(() => {
    dispatch(getLocalWeather());
  }, [dispatch, units, lang]);

  const Loading = () => (
    <div className='loading'>
      <FontAwesomeIcon size='6x' icon={faUndo} />
    </div>
  );

  const Weather = () => (
    <div className='current-container'>
      <h1>{localWeather.name}</h1>
      <div className='current-body'>
        <div className='today'>
          <div className='current-day'>
            <span>
              <img
                height='150px'
                src={`http://openweathermap.org/img/wn/${iconcode}@4x.png`}
                alt='weather icon'
              />
            </span>
            <div className='current-description'>
              <h2>
                {localWeather.main.temp} {units === 'metric' ? 'C º' : 'F º'}
              </h2>
              {localWeather.weather[0].description}
            </div>
          </div>
          <div className='current-more-info'>
            <div>
              <FontAwesomeIcon icon={faArrowUp} />
              {localWeather.main.temp_max} {units === 'metric' ? 'C º' : 'F º'}
            </div>
            <div>
              <FontAwesomeIcon icon={faArrowDown} />
              {localWeather.main.temp_min} {units === 'metric' ? 'C º' : 'F º'}
            </div>
          </div>
        </div>
        <div className='forecast'>
          <ul>
            {days.map((day, i) => {
              return (
                <li key={i}>
                  <div className='day'>{day}</div>
                  <div className='temps'>
                    <FontAwesomeIcon icon={faArrowUp} />
                    {localForecast[day].max}{' '}
                    {units === 'metric' ? 'C º' : 'F º'}
                    <FontAwesomeIcon icon={faArrowDown} />
                    {localForecast[day].min}{' '}
                    {units === 'metric' ? 'C º' : 'F º'}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );

  const iconcode = localWeather && localWeather.weather[0].icon;
  return localWeather ? <Weather /> : <Loading />;
}
