import React from 'react';

import DonateButton from './DonateButton';

import donateImg from './donate-face.jpg';

import styles from './index.module.css';

const Donate = () => {
  return (
    <div className={styles.wrap}>
      <p className={styles.donateP}>Help Jaymes Realize His German Fairytale Dream</p>
      <div className={styles.donateImg}>
        <img src={donateImg} alt="Jaymes Young" />
      </div>
      <p>Even just $5 or $10 will help</p>
      <DonateButton />
    </div>
  );
};

export default Donate;
