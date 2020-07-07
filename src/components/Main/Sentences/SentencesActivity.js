import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import SentenceBoard from './SentenceBoard';
import FinalMessage from '../FinalMessage';

import './sentences.css';

const SentencesActivity = ({ match }) => {
  const { lang } = useContext(LearningContext);
  const [isShownMessage, setIsShownMessage] = useState(false);
  const { category, id } = match.params;

  return (
    <ActivityWrap
      heading="Sentences"
      page="sentences"
    >
      <SentenceBoard
        lang={lang}
        type="sentences"
        category={category}
        activityId={id}
        showMessage={setIsShownMessage}
      />

      {isShownMessage && (
        <FinalMessage
          type="sentences"
          lang={lang}
        />
      )}
    </ActivityWrap>
  );
};

SentencesActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default SentencesActivity;
