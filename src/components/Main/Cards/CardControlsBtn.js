import React from 'react';
import PropTypes from 'prop-types';

import styles from './CardControlsBtn.module.css';

const CardControlsBtn = ({ btnType, handleClick }) => {
  if (btnType === 'back') {
    return (
      <button type="button" className={styles.wrap} onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path className={styles.arrow} d="M10 13h8V7h-8V2l-8 8 8 8v-5z" /></svg>
      </button>
    );
  }
  return (
    <button type="button" className={styles.wrap} onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path className={styles.arrow} d="M10 7H2v6h8v5l8-8-8-8v5z" /></svg>
    </button>
  );
};

CardControlsBtn.propTypes = {
  btnType: PropTypes.string,
  handleClick: PropTypes.func,
};

export default CardControlsBtn;
