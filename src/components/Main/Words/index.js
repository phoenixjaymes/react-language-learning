import React, { useContext, useEffect } from 'react';
import { LearningContext } from '../../Context';

import ActivityLink from '../ActivityComponents/ActivityLink';

const Words = () => {
  const { lang, labels, actions } = useContext(LearningContext);
  const headingLabel = labels.us.languages[lang];

  useEffect(() => {
    const { setDocumentTitle } = actions;
    setDocumentTitle('Word Match');
  }, [actions]);

  return (
    <section className="activity-section">
      <h1>{`${headingLabel} Words`}</h1>

      <div className="activity-buttons-z">
        <ActivityLink
          toPath="/words/adjective"
          text="Adjectives"
        />
        <ActivityLink
          toPath="/words/noun"
          text="Nouns"
        />
        <ActivityLink
          toPath="/words/verb"
          text="Verbs"
        />
      </div>
    </section>
  );
};

export default Words;
