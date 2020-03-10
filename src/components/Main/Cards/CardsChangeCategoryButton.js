import React from 'react';
import PropTypes from 'prop-types';

const CardsChangeCategoryButton = ({ category, changeCategory }) => {
  const categoryUCase = category.charAt(0).toUpperCase() + category.substring(1);
  return (
    <button
      type="button"
      className="activity_buttons__btn"
      onClick={() => changeCategory(category)}
      onKeyPress={() => changeCategory(category)}
    >
      {categoryUCase}
    </button>
  );
};

CardsChangeCategoryButton.propTypes = {
  category: PropTypes.string,
  changeCategory: PropTypes.func,
};

export default CardsChangeCategoryButton;
