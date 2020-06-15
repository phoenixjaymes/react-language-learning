import React from 'react';
import PropTypes from 'prop-types';

import ActivityLink from './ActivityLink';

const ActvityCategoriesGeneric = ({
  lang, activity, category, categoryList,
}) => {
  const buttons = categoryList.map((option) => {
    if (category === '') {
      return (
        <ActivityLink
          key={option.id}
          toPath={`/${lang}/${activity}/${option.id}`}
          text={option.name}
        />
      );
    }
    return (
      <ActivityLink
        key={option.id}
        toPath={`/${lang}/${activity}/${category}/${option.id}`}
        text={option.name}
      />
    );
  });

  return (
    <div>
      {buttons}
    </div>
  );
};

ActvityCategoriesGeneric.propTypes = {
  lang: PropTypes.string,
  activity: PropTypes.string,
  category: PropTypes.string,
  categoryList: PropTypes.arrayOf(PropTypes.object),
};

export default ActvityCategoriesGeneric;
