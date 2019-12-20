import React from 'react';
import PropTypes from 'prop-types';

const SentenceSolution = ({ isCorrect, answer }) => {
  if (isCorrect === true) {
    return (
      <div className="sentences__solution">
        <p><b>Correct</b></p>
      </div>
    );
  }

  if (isCorrect === false) {
    return (
      <div className="sentences__solution">
        <p>
          <b>Incorrect</b>
          <br />
          {answer}
        </p>
      </div>
    );
  }

  return <div className="sentences__solution--empty" />;
};

SentenceSolution.propTypes = {
  isCorrect: PropTypes.bool,
  answer: PropTypes.string,
};

export default SentenceSolution;
