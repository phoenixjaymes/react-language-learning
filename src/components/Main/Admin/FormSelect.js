import React from 'react';
import PropTypes from 'prop-types';

import styles from './formSelect.module.css';

const FormSelect = ({
  name, categories, selected, label, handleCategory,
}) => {
  const categoryOptions = categories.map(category => (
    <option key={category.id} value={category.id}>{category.name}</option>
  ));

  return (
    <label className={styles.label} htmlFor="selCategory">
      {label}
      <select
        id="selCategory"
        name={name}
        className={styles.select}
        value={selected}
        onChange={handleCategory}
      >
        <option value="">{`Select ${label}`}</option>
        {categoryOptions}
      </select>
    </label>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.string,
  label: PropTypes.string,
  handleCategory: PropTypes.func,
};

export default FormSelect;
