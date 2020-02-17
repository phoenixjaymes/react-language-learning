import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../../Context';
import ActivityLink from '../ActivityComponents/ActivityLink';

const Blanks = ({ context }) => {
  const { categories, lang, labels } = context;
  const headingLabel = labels.us.languages[lang];

  const buttons = categories[lang].blank.map(option => (
    <ActivityLink key={option.id} toPath={`/${lang}/blanks/${option.id}`} text={option.name} />
  ));

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Blanks`}</h1>

      <h3>Select your Blanks</h3>

      <div className="activity-buttons activity-categories">
        {buttons}
      </div>
    </section>
  );
};

Blanks.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(Blanks);
