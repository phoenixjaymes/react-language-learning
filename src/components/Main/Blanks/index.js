import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../../Context';
import ActivityCategoriesGeneric from '../ActivityComponents/ActivityCategoriesGeneric';

const Blanks = ({ context }) => {
  const { categories, lang, labels } = context;
  const headingLabel = labels.us.languages[lang];

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Blanks`}</h1>

      <div className="activity-buttons activity-categories">
        <ActivityCategoriesGeneric
          lang={lang}
          activity="blanks"
          category=""
          categoryList={categories[lang].blank}
        />
      </div>
    </section>
  );
};

Blanks.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(Blanks);
