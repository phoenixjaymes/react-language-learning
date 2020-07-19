import React from 'react';
import PropTypes from 'prop-types';

import CardControlsBtn from './CardControlsBtn';

import styles from './cardControls.module.css';

const CardControls = ({
  currentCard, totalCards, cardBack, cardNext,
}) => (
    <div className={styles.cardsControls}>
      <CardControlsBtn
        btnType="back"
        handleClick={cardBack}
      />
      <span className={styles.cardsCount}>
        {`${currentCard} of ${totalCards}`}
      </span>
      <CardControlsBtn
        btnType="next"
        handleClick={cardNext}
      />
    </div>
  );

CardControls.propTypes = {
  currentCard: PropTypes.number,
  totalCards: PropTypes.number,
  cardBack: PropTypes.func,
  cardNext: PropTypes.func,
};

export default CardControls;
