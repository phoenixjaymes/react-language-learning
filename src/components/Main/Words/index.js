import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../../Context';
import ActivityLink from '../ActivityComponents/ActivityLink';

const Words = ({ context }) => {
  const { lang, labels } = context;
  const headingLabel = labels.us.languages[lang];

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Words`}</h1>

      <div className="activity-buttons">
        <ActivityLink
          toPath="/words/adjective"
          text="Adjectives"
        />
        <ActivityLink
          toPath="/words/noun"
          text="Nouns"
        />
        <ActivityLink
          toPath="/words/verb"
          text="Verbs"
        />
      </div>
    </section>
  );
};

Words.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(Words);
