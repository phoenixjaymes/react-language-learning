import React from 'react';
import PropTypes from 'prop-types';

import styles from './formTextarea.module.css';

const FormTextarea = ({
  label, name, value, handleChange
}) => {

  return (
    <label className={styles.label} htmlFor={name}>
      {label}
      <textarea
        id={name}
        name={name}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

FormTextarea.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

export default FormTextarea;
