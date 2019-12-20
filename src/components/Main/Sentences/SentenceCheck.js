import React from 'react';
import PropTypes from 'prop-types';

const SentenceCheck = ({
  buttonToShow, checkSentence, continueSentences, finishSentences,
}) => {
  if (buttonToShow === 'check') {
    return (
      <div><a href="#button" className="sentences__check-btns" onClick={checkSentence}>Check</a></div>
    );
  }

  if (buttonToShow === 'continue') {
    return (
      <div><a href="#button" className="sentences__check-btns" onClick={continueSentences}>Continue</a></div>
    );
  }

  if (buttonToShow === 'finish') {
    return (
      <div><a href="#button" className="sentences__check-btns" onClick={finishSentences}>Finish</a></div>
    );
  }
  return <div />;
};

SentenceCheck.propTypes = {
  buttonToShow: PropTypes.string,
  checkSentence: PropTypes.func,
  continueSentences: PropTypes.func,
  finishSentences: PropTypes.func,
};

export default SentenceCheck;
