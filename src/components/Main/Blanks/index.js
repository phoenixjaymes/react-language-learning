import React, { useContext } from 'react';
import { LearningContext } from '../../Context';

import ActivityCategoriesGeneric from '../ActivityComponents/ActivityCategoriesGeneric';

const Blanks = () => {
  const { categories, lang, labels } = useContext(LearningContext);
  const headingLabel = labels.us.languages[lang];

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Blanks`}</h1>

      <div className="activity-buttons activity-categories">
        <ActivityCategoriesGeneric
          activity="blanks"
          category=""
          categoryList={categories[lang].blank}
        />
      </div>
    </section>
  );
};

export default Blanks;
