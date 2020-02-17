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

      <h3>Select your Words</h3>

      <div className="activity-buttons">
        <ActivityLink
          toPath={`/${lang}/words/adjective`}
          text="Adjectives"
        />
        <ActivityLink
          toPath={`/${lang}/words/noun`}
          text="Nouns"
        />
        <ActivityLink
            toPath={`/${lang}/words/verb`}
          text="Verbs"
        />
      </div>

    </section>
  );
};

Words.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
  context: PropTypes.shape(),
};

export default withContext(Words);
