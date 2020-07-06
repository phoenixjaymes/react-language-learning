import React from 'react';
import { LearningConsumer } from '../../Context';

import ActivityLink from '../ActivityComponents/ActivityLink';
import ActivityCategoriesGeneric from '../ActivityComponents/ActivityCategoriesGeneric';

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
                toPath="/sentences/type/random"
                text="Random"
              />
              <br />

              <ActivityCategoriesGeneric
                activity="sentences"
                category="type"
                categoryList={categories[lang].sentence_type}
              />

              <ActivityCategoriesGeneric
                activity="sentences"
                category="categpry"
                categoryList={categories[lang].sentence}
              />
            </div>
          </section>
        );
      }
    }
  </LearningConsumer>
);

export default Sentences;
