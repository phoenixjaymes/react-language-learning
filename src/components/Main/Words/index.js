import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withContext from '../../Context';

const Words = ({ context }) => {
  const { lang, labels } = context;
  const headingLabel = labels.us.languages[lang];

  return (
    <section className="flashcards">
      <h1>{`${headingLabel} Words`}</h1>

      <h3>Select your Words</h3>

      <div className="activity-buttons">
        <Link to={`/${lang}/words/adjective`} className="activity_buttons__btn">Adjectives</Link>
        <Link to={`/${lang}/words/noun`} className="activity_buttons__btn">Nouns</Link>
        <Link to={`/${lang}/words/verb`} className="activity_buttons__btn">Verbs</Link>
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
