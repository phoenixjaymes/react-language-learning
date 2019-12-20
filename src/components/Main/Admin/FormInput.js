import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  label, name, value, handleChange, pos,
}) => {
  const classSuffix = pos === 'verb' ? '--verb' : '';

  return (
    <label className={`form__label${classSuffix}`} htmlFor={name}>
      {label}
      <input
        id={name}
        name={name}
        className={`form__input${classSuffix}`}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

FormInput.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  pos: PropTypes.string,
};

export default FormInput;
