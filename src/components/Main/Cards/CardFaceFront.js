import React from 'react';
import PropTypes from 'prop-types';

const CardFaceFront = ({ cardData, handleFlipClick }) => {
  if (cardData.img !== 'none') {
    return (
      <div className="card__front">
        <figure className="card__figure">
          <img className="card__img" src={cardData.img} alt={cardData.english} />
        </figure>

        <button type="button" className="card__button" onClick={handleFlipClick}>Flip</button>
      </div>
    );
  }
  return (
    <div className="card__front">
      <div className="card__text-wrap">
        <p className="card__text">{cardData.english}</p>
      </div>

      <button type="button" className="card__button" onClick={handleFlipClick}>Flip</button>
    </div>
  );
};

CardFaceFront.propTypes = {
  cardData: PropTypes.shape(),
  handleFlipClick: PropTypes.func,
};

export default CardFaceFront;
