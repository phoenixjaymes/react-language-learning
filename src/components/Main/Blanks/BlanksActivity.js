import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import BlanksBoard from './BlanksBoard';
import FinalMessage from '../FinalMessage';

const BlanksActivity = ({ match }) => {
  const [isShownMessage, setIsShownMessage] = useState(false);
  const { lang, category, id } = match.params;

  return (
    <ActivityWrap
      heading="Blanks"
      page="blanks"
    >
      <BlanksBoard
        lang={lang}
        type="blanks"
        category={category}
        activityId={id}
        showMessage={setIsShownMessage}
      />

      {isShownMessage && (
        <FinalMessage
          type="blanks"
          lang={lang}
        />
      )}
    </ActivityWrap>
  );
};

BlanksActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default BlanksActivity;
