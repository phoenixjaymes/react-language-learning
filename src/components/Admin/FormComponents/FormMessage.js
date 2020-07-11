import React from 'react';
import PropTypes from 'prop-types';

import styles from './formMessage.module.css';

const FormMessage = ({ messageValues }) => {
  let statusClass;

  if (messageValues.status === 'success') {
    statusClass = styles.messageSuccess;
  } else if (messageValues.status === 'fail' || messageValues.status === 'error') {
    statusClass = styles.messageFail;
  } else {
    statusClass = '';
  }

  return (
    <p className={`${styles.messageText} ${statusClass}`}>
      {messageValues.message}
    </p>
  );
};

FormMessage.propTypes = {
  messageValues: PropTypes.objectOf(PropTypes.string),
};

export default FormMessage;
