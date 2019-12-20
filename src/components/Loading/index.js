import React from 'react';

import homeImage from './flashcard-icon.svg';
import './loading.css';

const Loading = () => (
  <div className="home-loader">
    <div className="home-loader__inner">
      <div className="home-loader__img">
        <img src={homeImage} alt="a country" />
      </div>
      <div className="home-loader__spin1" />
      <div className="home-loader__spin2" />
      <p className="home-loader__msg">Loading Resources</p>
    </div>
  </div>
);

export default Loading;
