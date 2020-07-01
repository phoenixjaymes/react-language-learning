import React from 'react';
import PropTypes from 'prop-types';
import { LearningConsumer } from '../../Context';

import ActivityLink from '../ActivityComponents/ActivityLink';
import ActivityCategoriesGeneric from '../ActivityComponents/ActivityCategoriesGeneric';

const SentenceOptionsLinks = ({ lang, categories }) => {
  const buttons = categories.map((option) => (
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

            <div className="activity-buttons activity-categories">
              <ActivityLink
                toPath={`/${lang}/sentences/type/random`}
                text="Random"
              />
              <br />

              <ActivityCategoriesGeneric
                lang={lang}
                activity="sentences"
                category="type"
                categoryList={categories[lang].sentence_type}
              />

              <ActivityCategoriesGeneric
                lang={lang}
                activity="sentences"
                category="categpry"
                categoryList={categories[lang].sentence}
              />


              {/* {categories.de !== undefined && (
                <SentenceOptionsLinks
                  lang={lang}
                  categories={categories[lang].sentence}
                />
              )} */}
            </div>
          </section>
        );
      }}
  </LearningConsumer>
);

export default Sentences;
