import React from 'react';

import styles from './donateButton.module.css';
// https://www.gofundme.com/f/help-jaymes-realize-his-german-fairytale-dream/donate

import svgGofundme from './gofundme.svg';

const DonateButton = () => (
  <div className={styles.donateBtn}>
    <div className={styles.donateBtnGrid}>
      <img className={styles.donateIcon} src={svgGofundme} alt="go fund me icon" />
      <a className={styles.donateText} href="https://www.gofundme.com/f/help-jaymes-realize-his-german-fairytale-dream/">DONATE NOW</a>
    </div>
  </div>

);

export default DonateButton;
