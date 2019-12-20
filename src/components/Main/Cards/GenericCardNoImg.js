import React from 'react';
import PropTypes from 'prop-types';

const GenericCardNoImg = ({
  flipClass, english, flipCard, gender, translation, example,
}) => (
  <div className={`card ${flipClass}`}>
    <div className="card__front">
      <div className="card__text-wrap">
        <p className="card__text">{english}</p>
      </div>

      <button type="button" className="card__button" onClick={flipCard}>Flip</button>
    </div>

    <div className={`card__back ${gender}`}>
      <div className="card__text-wrap">
        <p className="card__text">{translation}</p>
      </div>

      <p className="card__example">{example}</p>

      <button type="button" className="card__button" onClick={flipCard}>Flip</button>
    </div>
  </div>
);

GenericCardNoImg.propTypes = {
  flipClass: PropTypes.string,
  english: PropTypes.string,
  flipCard: PropTypes.func,
  gender: PropTypes.string,
  translation: PropTypes.string,
  example: PropTypes.string,
};

export default GenericCardNoImg;
