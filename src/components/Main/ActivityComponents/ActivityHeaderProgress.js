import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './activityHeaderProgress.module.css';

const ActivityHeader = ({ currentCard, totalCards, page }) => {
  const percentCompleted = (currentCard / totalCards) * 100;

  const progress = {
    width: `${percentCompleted}%`,
  };

  return (
    <header className={styles.header}>
      <Link to={`/${page}`} className={styles.closeLink}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path className={styles.closeSvg} d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>
      </Link>
      <div className={styles.progressBar}>
        <span className={styles.progress} style={progress} />
      </div>
    </header>
  )
};

ActivityHeader.propTypes = {
  currentCard: PropTypes.number,
  totalCards: PropTypes.number,
  page: PropTypes.string,
};

export default ActivityHeader;
