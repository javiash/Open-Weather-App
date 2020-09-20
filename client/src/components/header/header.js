import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUnits,
  updateLang,
} from '../../context/reducers/weather-reducer';
import './header.scss';

export default function Header() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.weatherReducer.lang);
  const units = useSelector((state) => state.weatherReducer.units);

  const languages = ['es', 'en', 'fr'];

  const changeUnits = () => {
    const unit = units === 'metric' ? 'imperial' : 'metric';
    dispatch(updateUnits(unit));
  };

  const changeLang = (e) => {
    const lang = e.target.value;
    dispatch(updateLang(lang));
  };

  return (
    <header>
      <div className='header-logo'>
        <img
          src='https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png'
          alt='Logo'
        />
      </div>
      <div className='header-options'>
        <div className='temp-switch'>
          <h3>F º</h3>
          <label>
            <input
              type='checkbox'
              checked={units === 'metric'}
              onChange={changeUnits}
            />
            <span></span>
            <i className='indicator'></i>
          </label>
          <h3>C º</h3>
        </div>
        <div className='lang-switch'>
          <img
            src={`https://www.countryflags.io/${
              lang === 'es' ? 'ar' : lang === 'en' ? 'gb' : lang
            }/flat/32.png`}
            alt={`${lang} flag`}
          />
          <select name='language' onChange={changeLang}>
            {languages.map((lang) => {
              return (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </header>
  );
}
