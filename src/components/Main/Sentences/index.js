import React, { useContext, useEffect } from 'react';
import { LearningContext } from '../../Context';

import ActivityLink from '../ActivityComponents/ActivityLink';
import ActvityCategories from '../ActivityComponents/ActivityCategories';

const Sentences = () => {
  const { categories, lang, labels, actions } = useContext(LearningContext);
  const headingLabel = labels.us.languages[lang];

  useEffect(() => {
    const { setDocumentTitle } = actions;
    setDocumentTitle('Sentences');
  }, [actions]);

  const wrap = {
    textAlign: 'center',
    marginBottom: '15px',
  };

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Sentences`}</h1>

      <div className="activity-buttons activity-categories">

        <div style={wrap}>
          <ActivityLink
            toPath="/sentences/type/random"
            text="Random"
          />
        </div>

        <ActvityCategories
          activity="sentences"
          category="type"
          categoryList={categories[lang].sentence_type}
        />

        <ActvityCategories
          activity="sentences"
          category="categpry"
          categoryList={categories[lang].sentence}
        />
      </div>
    </section>
  );
};

export default Sentences;
