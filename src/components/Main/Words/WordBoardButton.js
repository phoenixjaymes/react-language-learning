import React from 'react';
import PropTypes from 'prop-types';

import styles from './wordBoardButton.module.css';

const WordBoardButton = ({ word, handleWordClick }) => {
  let buttonState = '';

  if (word.isClicked === true) {
    buttonState = styles.clicked;
  } else if (word.isMatched === true) {
    buttonState = styles.matched;
  } else if (word.isClickCorrect === false) {
    buttonState = styles.incorrectClick;
  }

  return (
    <button className={`${styles.button} ${buttonState}`} type="button" onClick={() => handleWordClick(word)}>
      {word.word}
    </button>
  );
}

WordBoardButton.propTypes = {
  word: PropTypes.shape({
    id: PropTypes.number,
    matchId: PropTypes.string,
    word: PropTypes.string,
    isClicked: PropTypes.bool,
    isMatched: PropTypes.bool,
  }),
  handleWordClick: PropTypes.func,
};

export default WordBoardButton;
