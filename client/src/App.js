import React from 'react';

// Components
import Header from './components/header/header';
import CurrentCity from './components/currentCity/currentCity';
import Cities from './components/cities/cities';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <Header />
      <CurrentCity />
      <Cities />
    </div>
  );
}

export default App;
