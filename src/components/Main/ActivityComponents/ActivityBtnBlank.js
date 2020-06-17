import React from 'react';
import PropTypes from 'prop-types';

import styles from './activityBtnSentence.module.css';

const ActivityBtnBlank = ({ label, handleClick }) => (
  <button type="button" className={styles.button} onClick={() => handleClick(label)}>
    {label}
  </button>
);

ActivityBtnBlank.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ActivityBtnBlank;
