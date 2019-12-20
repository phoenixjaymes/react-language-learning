import React from 'react';
import PropTypes from 'prop-types';

const CardControls = ({
  currentCard, totalCards, cardBack, cardNext,
}) => (
  <div className="cards-controls">
    <button type="button" href="#back" className="cards-controls__btn" onClick={cardBack}>&lArr;</button>
    <span className="cards-controls__count">
      {`${currentCard} of ${totalCards}`}
    </span>
    <button type="button" href="#next" className="cards-controls__btn" onClick={cardNext}>&rArr;</button>
  </div>
);

CardControls.propTypes = {
  currentCard: PropTypes.number,
  totalCards: PropTypes.number,
  cardBack: PropTypes.func,
  cardNext: PropTypes.func,
};

export default CardControls;
