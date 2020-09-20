import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './weatherCard.scss';

export default function WeatherCard(props) {
  const { index, weather, changeCity, deleteCard } = props;
  const { currentWeather, currentForecast } = weather;
  const days = Object.keys(currentForecast);
  const units = useSelector((state) => state.weatherReducer.units);

  const cityRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const moreInfo = () => {
    frontRef.current.classList.toggle('active');
    backRef.current.classList.toggle('active');
  };

  const checkWeather = async () => {
    return changeCity(cityRef.current.value, index);
  };

  const enterWeather = (e) => {
    if (e.key === 'Enter') checkWeather();
  };

  const closeCard = () => {
    deleteCard(index);
  };

  const iconcode = currentWeather.weather[0].icon;
  return (
    <div className='card'>
      <div className='card-front' ref={frontRef}>
        <div className='card-top'>
          <button onClick={closeCard} className='button-close'>
            X
          </button>
          <input
            ref={cityRef}
            onKeyPress={enterWeather}
            type='text'
            className='search'
            placeholder='Ciudad/City/Ville'
          />
          <button onClick={moreInfo} className='button-info'>
            i
          </button>
        </div>
        <div className='card-body'>
          <h3>{currentWeather.name}</h3>
          <div className='card-current'>
            <span>
              <img
                src={`http://openweathermap.org/img/wn/${iconcode}@2x.png`}
                alt='weather icon'
              />
            </span>
            <div className='card-description'>
              <h3>
                {currentWeather.main.temp} {units === 'metric' ? 'C º' : 'F º'}
              </h3>
              <p>{currentWeather.weather[0].description}</p>
            </div>
          </div>
          <div className='card-more-info'>
            <div>
              <FontAwesomeIcon icon={faArrowUp} />
              <p>
                {currentWeather.main.temp_max}{' '}
                {units === 'metric' ? 'C º' : 'F º'}
              </p>
            </div>
            <div>
              <FontAwesomeIcon icon={faArrowDown} />
              <p>
                {currentWeather.main.temp_min}{' '}
                {units === 'metric' ? 'C º' : 'F º'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='card-back' ref={backRef}>
        <div className='card-top'>
          <button onClick={moreInfo} className='button-info'>
            i
          </button>
        </div>
        <div className='card-body'>
          <ul>
            {days.map((day, i) => {
              return (
                <li key={i}>
                  <div className='day'>{day}</div>
                  <div className='temps'>
                    <FontAwesomeIcon icon={faArrowUp} />
                    {currentForecast[day].max}{' '}
                    {units === 'metric' ? 'C º' : 'F º'}
                    <FontAwesomeIcon icon={faArrowDown} />
                    {currentForecast[day].min}{' '}
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
}
