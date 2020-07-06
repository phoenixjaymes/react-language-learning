import React from 'react';

import ActivityLink from '../ActivityComponents/ActivityLink';

const CardCategoriesVerb = () => {
  const categoryList = ['present', 'perfect', 'imperfect', 'dative', 'reflexive', 'separable'];
  const buttons = categoryList.map((option) => (
    <ActivityLink
      key={option}
      toPath={`/cards/verb/${option}`}
      text={option}
    />
  ));

  return (
    <div>
      {buttons}
    </div>
  );
};

export default CardCategoriesVerb;
