import React from 'react';
import PropTypes from 'prop-types';

import styles from './formMessage.module.css';

const FormMessage = ({ response, status }) => {
  let statusClass;

  if (status === 'success') {
    statusClass = styles.messageSuccess;
  } else if (status === 'fail' || status === 'error') {
    statusClass = styles.messageFail;
  } else {
    statusClass = '';
  }

  return (
    <p className={`${styles.messageText} ${statusClass}`}>
      {response}
    </p>
  );
};

FormMessage.propTypes = {
  response: PropTypes.string,
  status: PropTypes.string,
};

export default FormMessage;
