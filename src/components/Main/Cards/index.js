import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import ActivityLink from '../ActivityComponents/ActivityLink';
import CardCategoriesGeneric from './CardCategoriesGeneric';
import CardCategoriesVerb from './CardCategoriesVerb';

// Cards Component
class Cards extends Component {
  componentDidMount() {
    const value = this.context;
    const { setDocumentTitle } = value.actions;
    setDocumentTitle('Flash Cards');
  }

  render() {
    const { lang, categories, labels } = this.context;
    const headingLabel = labels.us.languages[lang];

    return (
      <section className="activity-section">
        <h1>{`${headingLabel} Cards`}</h1>

        <div className="activity-buttons activity-categories">
          <h2>Adjectives</h2>
          <CardCategoriesGeneric
            lang={lang}
            category="adjective"
            categoryList={categories[lang].adjective}
          />

          <h2>Nouns</h2>
          {lang !== 'af' && (
            <CardCategoriesGeneric
              lang={lang}
              category="gender"
              categoryList={categories[lang].gender}
            />
          )}

          <CardCategoriesGeneric
            lang={lang}
            category="noun"
            categoryList={categories[lang].noun}
          />

          <h2>Verbs</h2>
          <CardCategoriesVerb lang={lang} />

          <h2>Phrases</h2>
          <ActivityLink
            toPath={`/${lang}/cards/phrase`}
            text="Phrases"
          />
        </div>
      </section>
    );
  }
}

Cards.contextType = LearningContext;

Cards.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Cards;
