import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './activityHeader.module.css';

const ActivityHeader = ({ page, heading }) => (
  <header className={styles.header}>
    <Link to={`/${page}`} className="btn-activitiy activity__close">X</Link>
    <h2 className={styles.heading}>{heading}</h2>
  </header>
);

ActivityHeader.propTypes = {
  page: PropTypes.string,
  heading: PropTypes.string,
};

export default ActivityHeader;
