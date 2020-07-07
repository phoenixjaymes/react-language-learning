import React from 'react';

import homeImage from './flashcard-icon.svg';
import './loading.css';

const LoadingError = () => (
  <div className="home-loader">
    <div className="home-loader__inner">
      <div className="home-loader__img">
        <img src={homeImage} alt="a country" />
      </div>
      <div className="home-loader__spin1" />
      <div className="home-loader__spin2" />
      <p className="home-loader__msg">
        Sorry, unable to load Resources
        <br />
        Try again later
      </p>
    </div>
  </div>
);

export default LoadingError;
