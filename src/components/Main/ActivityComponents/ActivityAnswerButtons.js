import React from 'react';
import PropTypes from 'prop-types';

import styles from './activityAnswerButtons.module.css';

const ActivityAnswerButtons = ({
  buttonToShow, handleCheckClick, handleContinueClick, handleFinishClick,
}) => {
  if (buttonToShow === 'check') {
    return (
      <button type="button" className={styles.button} onClick={handleCheckClick}>Check</button>
    );
  }

  if (buttonToShow === 'continue') {
    return (
      <button type="button" className={styles.button} onClick={handleContinueClick}>Continue</button>
    );
  }

  if (buttonToShow === 'finish') {
    return (
      <button type="button" className={styles.button} onClick={handleFinishClick}>Finish</button>
    );
  }
  return <div />;
};

ActivityAnswerButtons.propTypes = {
  buttonToShow: PropTypes.string,
  handleCheckClick: PropTypes.func,
  handleContinueClick: PropTypes.func,
  handleFinishClick: PropTypes.func,
};

export default ActivityAnswerButtons;
