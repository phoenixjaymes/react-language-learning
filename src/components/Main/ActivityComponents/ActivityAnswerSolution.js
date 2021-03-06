import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './ActivityAnswerSolution.module.css';

import gameWinSound from './gameWin.mp3';
import gameLoseSound from './gameLose.mp3';

const ActivityAnswerSolutions = ({ isCorrect, answer }) => {
  useEffect(() => {
    if (isCorrect === true) {
      const audio = new Audio(gameWinSound);
      audio.play();
    } else if (isCorrect === false) {
      const audio = new Audio(gameLoseSound);
      audio.play();
    }
  }, [isCorrect]);

  if (isCorrect === true) {
    return (
      <p className={styles.wrap}>
        <b>Good Job!</b>
      </p>
    );
  }

  if (isCorrect === false) {
    return (
      <p className={styles.wrap}>
        <b>Incorrect</b>
        <br />
        {answer}
      </p>
    );
  }

  return <div />;
};

ActivityAnswerSolutions.propTypes = {
  isCorrect: PropTypes.bool,
  answer: PropTypes.string,
};

export default ActivityAnswerSolutions;
