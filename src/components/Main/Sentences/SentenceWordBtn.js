import React from 'react';
import PropTypes from 'prop-types';

import styles from './sentenceWordBtn.module.css';

const ActivityBtnSentence = ({ label, id, handleClick }) => (
  <button type="button" className={styles.button} onClick={() => handleClick(id)}>
    {label}
  </button>
);

ActivityBtnSentence.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number,
  handleClick: PropTypes.func,
};

export default ActivityBtnSentence;
