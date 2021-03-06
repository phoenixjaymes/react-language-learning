import React, { useContext, useEffect } from 'react';
import { LearningContext } from '../../Context';

import ActvityCategories from '../ActivityComponents/ActivityCategories';

const Blanks = () => {
  const {
    categories, lang, labels, actions,
  } = useContext(LearningContext);
  const headingLabel = labels.us.languages[lang];

  useEffect(() => {
    const { setDocumentTitle } = actions;
    setDocumentTitle('Blanks');
  }, [actions]);

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Blanks`}</h1>

      <div className="activity-buttons activity-categories">
        <ActvityCategories
          activity="blanks"
          category=""
          categoryList={categories[lang].blank}
        />
      </div>
    </section>
  );
};

export default Blanks;
