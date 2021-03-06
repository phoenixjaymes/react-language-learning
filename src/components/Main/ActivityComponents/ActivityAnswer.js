import React from 'react';
import PropTypes from 'prop-types';

import ActivityAnswerButtons from './ActivityAnswerButtons';
import ActivityAnswerSolution from './ActivityAnswerSolution';

import styles from './activityAnswer.module.css';

const ActivityAnswer = ({
  buttonToShow, handleCheckClick, handleContinueClick, handleFinishClick, isCorrect, answer,
}) => {
  let wrapStyles = { backgroundColor: 'transparent' };

  if (isCorrect === true) {
    wrapStyles = { backgroundColor: '#D7FFB8' };
  } else if (isCorrect === false) {
    wrapStyles = { backgroundColor: '#FFDFE0' };
  } else {
    wrapStyles = { backgroundColor: 'transparent' };
  }

  return (
    <div className={styles.wrap} style={wrapStyles}>
      <div className={styles.solution}>
        <ActivityAnswerSolution
          isCorrect={isCorrect}
          answer={answer}
        />
      </div>

      <div className={styles.buttons}>
        <ActivityAnswerButtons
          buttonToShow={buttonToShow}
          handleCheckClick={handleCheckClick}
          handleContinueClick={handleContinueClick}
          handleFinishClick={handleFinishClick}
        />
      </div>
    </div>
  );
};

ActivityAnswer.propTypes = {
  buttonToShow: PropTypes.string,
  handleCheckClick: PropTypes.func,
  handleContinueClick: PropTypes.func,
  handleFinishClick: PropTypes.func,
  isCorrect: PropTypes.bool,
  answer: PropTypes.string,
};

export default ActivityAnswer;
