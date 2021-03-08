import React from 'react';
import PropTypes from 'prop-types';

import ActivityLink from './ActivityLink';

const ActvityCategoriesTitles = ({
  activity, categoryList,
}) => {
  const wrap = {
    marginBottom: '15px',
    padding: '0',
    margin: '0',
    width: '100%',
  };

  const h2 = {
    marginBottom: '10px',
  };

  const btnWrap = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '15px',
    width: '100%',
  };

  const sections = categoryList.map((item) => {
    const sectionTitles = item.titles.map((title) => (
      <ActivityLink key={title.tId} toPath={`/${activity}/${title.tId}`} text={title.name} />
    ));

    return (
      <div style={wrap}>
        <h2 style={h2} key={item.id}>{item.name}</h2>
        <div style={btnWrap}>
          {sectionTitles}
        </div>
      </div>
    );
  });

  return (
    <div>
      {sections}
    </div>
  );
};

ActvityCategoriesTitles.defaultProps = {
  categoryList: '',
};

ActvityCategoriesTitles.propTypes = {
  activity: PropTypes.string,
  categoryList: PropTypes.arrayOf(PropTypes.object),
};

export default ActvityCategoriesTitles;
