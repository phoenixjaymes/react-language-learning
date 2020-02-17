import React from 'react';
import PropTypes from 'prop-types';
import { LearningConsumer } from '../../Context';

import ActivityLink from '../ActivityComponents/ActivityLink';

const SentenceOptionsLinks = ({ lang, categories }) => {
  const buttons = categories.map(option => (
    <ActivityLink key={option.id} toPath={`/${lang}/sentences/category/${option.id}`} text={option.name} />
  ));

  return (
    <div className="activity-buttons activity-categories">
      {buttons}
    </div>
  );
};

SentenceOptionsLinks.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  lang: PropTypes.string.isRequired,
};

const Sentences = () => (
  <LearningConsumer>
    {
      (context) => {
        const { categories, lang, labels } = context;
        const headingLabel = labels.us.languages[lang];
        return (
          <section className="activity-section">
            <h1>{`${headingLabel} Sentences`}</h1>

            <h3>Select your Sentences</h3>

            <div className="activity-buttons activity-categories">
              <ActivityLink
                toPath={`/${lang}/sentences/type/random`}
                text="Random"
              />
              <br />
              <ActivityLink
                toPath={`/${lang}/sentences/type/1`}
                text="Statement"
              />

              <ActivityLink
                toPath={`/${lang}/sentences/type/2`}
                text="Question"
              />

              <ActivityLink
                toPath={`/${lang}/sentences/type/3`}
                text="Answer"
              />
              <br />
              <br />
              { categories.de !== undefined && (
                <SentenceOptionsLinks
                  lang={lang}
                  categories={categories[lang].sentence_cat}
                />
              )}
            </div>
          </section>
        );
      }}
  </LearningConsumer>
);

export default Sentences;
