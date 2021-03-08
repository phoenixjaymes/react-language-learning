import React, { useContext, useEffect } from 'react';
import { LearningContext } from '../../Context';

import ActvityCategoriesTitles from '../ActivityComponents/ActivityCategoriesTitles';

const Grammar = () => {
  const {
    categories, lang, labels, actions,
  } = useContext(LearningContext);
  const headingLabel = labels.us.languages[lang];

  useEffect(() => {
    const { setDocumentTitle } = actions;
    setDocumentTitle('Grammar');
  }, [actions]);

  let grammarCategories;

  if (categories[lang].grammar.length > 0) {
    grammarCategories = (
      <ActvityCategoriesTitles
        activity="Grammar"
        categoryList={categories[lang].grammar}
      />
    );
  } else {
    grammarCategories = (
      <h2>
        Sorry, there no categories for this section.
        <br />
        Categories coming soon.
      </h2>
    );
  }

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Grammar`}</h1>

      <div className="activity-buttons activity-categories">
        {grammarCategories}
      </div>
    </section>
  );
};

export default Grammar;
