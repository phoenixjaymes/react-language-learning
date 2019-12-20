import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withContext from '../../Context';

const BlanksOptionsLinks = ({ lang, categories }) => {
  const buttons = categories.map(option => (
    <Link key={option.id} type="button" to={`/${lang}/blanks/${option.id}`} className="activity_buttons__btn">{option.name}</Link>
  ));

  return (
    <div className="activity-buttons activity-categories">
      {buttons}
    </div>
  );
};

BlanksOptionsLinks.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  lang: PropTypes.string.isRequired,
};

const Blanks = ({ context }) => {
  const { categories, lang, labels } = context;
  const headingLabel = labels.us.languages[lang];

  return (
    <section className="flashcards">
      <h1>{`${headingLabel} Blanks`}</h1>

      <h3>Select your Blanks</h3>

      <BlanksOptionsLinks
        lang={lang}
        categories={categories[lang].blank}
      />
    </section>
  );
};

Blanks.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(Blanks);
