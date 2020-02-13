import React from 'react';

import styles from './footer.module.css';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.mainFooter}>
      <div className={`${styles.mainFooterWrap} contentWrap`}>
        <small>{`\u00A9 ${date} PhoenixJaymes`}</small>
      </div>
    </footer>
  );
};

export default Footer;
