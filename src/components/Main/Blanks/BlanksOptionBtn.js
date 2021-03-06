import React from 'react';
import PropTypes from 'prop-types';

import styles from './blanksOptionBtn.module.css';

const BlanksOptionsBtn = ({ label, handleClick }) => (
  <button type="button" className={styles.button} onClick={() => handleClick(label)}>
    {label}
  </button>
);

BlanksOptionsBtn.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func,
};

export default BlanksOptionsBtn;
