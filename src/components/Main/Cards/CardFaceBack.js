import React from 'react';
import PropTypes from 'prop-types';

const CardFaceBack = ({ cardData, handleFlipClick }) => {
  if (cardData.img !== 'none') {
    return (
      <div className={`card__back ${cardData.gender}`}>
        <figure className="card__figure">
          <img className="card__img" src={cardData.img} alt={cardData.translation} />
          <figcaption className="card__caption">{cardData.translation}</figcaption>
        </figure>

        <p className="card__example">{cardData.example}</p>

        <button type="button" className="card__button" onClick={handleFlipClick}>Flip</button>
      </div>
    );
  }
  return (
    <div className={`card__back ${cardData.gender}`}>
      <div className="card__text-wrap">
        <p className="card__text">{cardData.translation}</p>
      </div>

      <p className="card__example">{cardData.example}</p>

      <button type="button" className="card__button" onClick={handleFlipClick}>Flip</button>
    </div>
  );
};

CardFaceBack.propTypes = {
  cardData: PropTypes.shape(),
  handleFlipClick: PropTypes.func,
};

export default CardFaceBack;
