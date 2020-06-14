import React from 'react';
import PropTypes from 'prop-types';

import ActivityLink from '../ActivityComponents/ActivityLink';

const CardCategoriesVerb = ({ lang }) => {
  const categoryList = ['present', 'perfect', 'imperfect', 'dative', 'reflexive', 'separable'];
  const buttons = categoryList.map((option) => (
    <ActivityLink
      key={option}
      toPath={`/${lang}/cards/verb/${option}`}
      text={option}
    />
  ));

  return (
    <div>
      {buttons}
    </div>
  );
};

CardCategoriesVerb.propTypes = {
  lang: PropTypes.string,
};

export default CardCategoriesVerb;
