import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './formWrapResponse.module.css';

const FormWrapResponse = ({ actionResponse, setActionReponse }) => {
  const { status, message } = actionResponse;
  const [wrapShow, setWrapShow] = useState('');

  useEffect(() => {
    if (status !== '') {
      setWrapShow(styles.show);

      setTimeout(() => {
        setActionReponse({ status: '', message: '' });
      }, 6000);

    } else {
      setWrapShow('');
    }
  }, [status, setActionReponse]);

  return (
    <div className={`${styles.wrap} ${wrapShow}`}>
      <div>
        <p>{message}</p>
        <button type="button" onClick={() => setActionReponse({ status: '', message: '' })}>X</button>
      </div>
    </div>
  );
};

FormWrapResponse.propTypes = {
  actionResponse: PropTypes.objectOf(PropTypes.string),
  setActionReponse: PropTypes.func,
};

export default FormWrapResponse;
