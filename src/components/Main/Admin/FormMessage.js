import React from 'react';
import PropTypes from 'prop-types';

const FormMessage = ({ response, status }) => {
  let statusClass;

  if (status === 'success') {
    statusClass = 'messageSuccess';
  } else if (status === 'fail' || status === 'error') {
    statusClass = 'messageFail';
  } else {
    statusClass = '';
  }

  return (
    <p className={`form-message__text ${statusClass}`}>
      {response}
    </p>
  );
};

FormMessage.propTypes = {
  response: PropTypes.string,
  status: PropTypes.string,
};

export default FormMessage;
