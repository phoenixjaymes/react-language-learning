import React from 'react';
import PropTypes from 'prop-types';

const GenericCardImg = ({
  flipClass, english, flipCard, gender, translation, example, image,
}) => (
  <div className={`card ${flipClass}`}>
    <div className="card__front">
      <figure className="card__figure">
        <img className="card__img" src={image} alt={english} />
      </figure>

      <button type="button" className="card__button" onClick={flipCard}>Flip</button>
    </div>

    <div className={`card__back ${gender}`}>
      <figure className="card__figure">
        <img className="card__img" src={image} alt={translation} />
        <figcaption className="card__caption">{translation}</figcaption>
      </figure>

      <p className="card__example">{example}</p>

      <button type="button" className="card__button" onClick={flipCard}>Flip</button>
    </div>
  </div>
);

GenericCardImg.propTypes = {
  flipClass: PropTypes.string,
  english: PropTypes.string,
  flipCard: PropTypes.func,
  gender: PropTypes.string,
  translation: PropTypes.string,
  example: PropTypes.string,
  image: PropTypes.string,
};

export default GenericCardImg;
