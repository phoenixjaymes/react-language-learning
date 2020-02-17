import React from 'react';
import PropTypes from 'prop-types';

import styles from './cardControls.module.css';

const CardControls = ({
  currentCard, totalCards, cardBack, cardNext,
}) => (
  <div className={styles.cardsControls}>
    <button type="button" href="#back" className={styles.button} onClick={cardBack}>&lArr;</button>
    <span className={styles.cardsCount}>
      {`${currentCard} of ${totalCards}`}
    </span>
    <button type="button" href="#next" className={styles.button} onClick={cardNext}>&rArr;</button>
  </div>
);

CardControls.propTypes = {
  currentCard: PropTypes.number,
  totalCards: PropTypes.number,
  cardBack: PropTypes.func,
  cardNext: PropTypes.func,
};

export default CardControls;
