import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({
  name, categories, selected, label, handleCategory,
}) => {
  const categoryOptions = categories.map(category => (
    <option key={category.id} value={category.id}>{category.name}</option>
  ));

  return (
    <label className="form__label" htmlFor="selCategory">
      {label}
      <select
        id="selCategory"
        name={name}
        className="form__select"
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
