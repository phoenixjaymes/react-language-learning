import React from 'react';
import PropTypes from 'prop-types';

import styles from './formButton.module.css';

const FormButton = ({ type, label, handleClick }) => {
  if (type === 'submit') {
    return (
      <button type="submit" className={styles.button}>
        {label}
      </button>
    );
  }

  return (
    <button type="button" className={styles.button} onClick={() => handleClick()}>
      {label}
    </button>
  );
};

FormButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
};

export default FormButton;
