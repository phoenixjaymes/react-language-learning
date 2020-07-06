import React from 'react';
import PropTypes from 'prop-types';

import ActivityLink from '../ActivityComponents/ActivityLink';

const CardCategoriesGeneric = ({ category, categoryList }) => {
  const buttons = categoryList.map((option) => (
    <ActivityLink
      key={option.id}
      toPath={`/cards/${category}/${option.id}`}
      text={option.name}
    />
  ));

  return (
    <div>
      {buttons}
    </div>
  );
};

CardCategoriesGeneric.propTypes = {
  category: PropTypes.string,
  categoryList: PropTypes.arrayOf(PropTypes.object),
};

export default CardCategoriesGeneric;
