import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import Donate from './Donate';
import DonateButton from './Donate/DonateButton';

import styles from './finalMessage.module.css';

const FinalMessage = ({ type }) => {
  const message = '';

  return (
    <div className={styles.finalMessage}>
      <div className={styles.finalMessageWrap}>
        <h3 className="sentences__message-text">
          {`${message}`}
          <br />
          Great Job!
          <br />
          Keep up the great work.
        </h3>
        {/* <p className="centered">Would you like to continue?</p> */}

        <br />

        <div className={styles.buttonWrap}>
          <Link to={`/${type}`} className={styles.button}>Continue</Link>
        </div>

        <br />
        <p>
          Help Jaymes reach his goal.
        </p>
        <br />
        <DonateButton />

      </div>
    </div>
  );
};

FinalMessage.propTypes = {
  type: PropTypes.string,
};

export default FinalMessage;
