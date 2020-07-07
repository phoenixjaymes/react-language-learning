import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import WordBoard from './WordBoard';
import FinalMessage from '../FinalMessage';

import './words.css';

const WordsActivity = ({ match }) => {
  const { lang } = useContext(LearningContext);
  const [isShownMessage, setIsShownMessage] = useState(false);
  const { category } = match.params;
  const wordsCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <ActivityWrap
      heading={`Match the ${wordsCategory}`}
      page="words"
    >
      <WordBoard
        lang={match.params.lang}
        category={match.params.category}
        showMessage={setIsShownMessage}
      />

      {isShownMessage && (
        <FinalMessage
          type="words"
          lang={lang}
        />
      )}
    </ActivityWrap>
  );
};

WordsActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default WordsActivity;
