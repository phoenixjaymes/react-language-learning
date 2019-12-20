import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FinalMessage = ({
  type, lang,
}) => {
  const message = '';

  return (
    <div className="final-message start-ani">
      <div className="final-message__wrap">
        <h3 className="sentences__message-text">{`${message}`}<br />Great Job</h3>
        <p className="centered">Would you like to continue?</p>

        <br />

        <div className="activity-buttons">
          <Link to={`/${lang}/${type}`} className="activity_buttons__btn">Continue</Link>
        </div>
      </div>
    </div>
  );
};

FinalMessage.propTypes = {
  type: PropTypes.string,
  lang: PropTypes.string,
};

export default FinalMessage;
