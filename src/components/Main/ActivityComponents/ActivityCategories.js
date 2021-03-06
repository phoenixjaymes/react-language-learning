import React from 'react';
import PropTypes from 'prop-types';

import ActivityLink from './ActivityLink';

const ActvityCategories = ({
  activity, category, categoryList,
}) => {
  const wrap = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '15px',
  };

  let buttons;

  if (activity === 'cards' && category === 'verb') {
    const verbCategoryList = ['present', 'perfect', 'imperfect', 'dative', 'reflexive', 'separable'];
    buttons = verbCategoryList.map((option) => (
      <ActivityLink
        key={option}
        toPath={`/cards/verb/${option}`}
        text={option}
      />
    ));
  } else if (category === '') {
    buttons = categoryList.map((option) => (
      <ActivityLink
        key={option.id}
        toPath={`/${activity}/${option.id}`}
        text={option.name}
      />
    ));
  } else {
    buttons = categoryList.map((option) => (
      <ActivityLink
        key={option.id}
        toPath={`/${activity}/${category}/${option.id}`}
        text={option.name}
      />
    ));
  }

  return (
    <div style={wrap}>
      {buttons}
    </div>
  );
};

ActvityCategories.propTypes = {
  activity: PropTypes.string,
  category: PropTypes.string,
  categoryList: PropTypes.arrayOf(PropTypes.object),
};

export default ActvityCategories;
