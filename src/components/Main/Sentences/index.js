import React, { useContext } from 'react';
import { LearningContext } from '../../Context';

import ActivityLink from '../ActivityComponents/ActivityLink';
import ActivityCategoriesGeneric from '../ActivityComponents/ActivityCategoriesGeneric';

const Sentences = () => {
  const { categories, lang, labels } = useContext(LearningContext);
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
};

export default Sentences;
