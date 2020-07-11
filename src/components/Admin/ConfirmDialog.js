import React from 'react';
import PropTypes from 'prop-types';

import styles from './confirmDialog.module.css';

const ConfirmDialog = ({ dialogMessage, handleYesClick, handleCancelClick }) => (
  <div className={styles.confirmDialog}>
    <div>
      <p>{dialogMessage}</p>
      <p>
        <button type="button" onClick={handleYesClick}>Yes</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </p>
    </div>
  </div>
);

ConfirmDialog.propTypes = {
  dialogMessage: PropTypes.string,
  handleYesClick: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
};

export default ConfirmDialog;
