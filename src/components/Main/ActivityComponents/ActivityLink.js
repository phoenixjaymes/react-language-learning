import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './activityLink.module.css';

const ActivityLink = ({ toPath, text }) => {
  const ucText = text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <Link to={toPath} className={styles.button}>{ucText}</Link>
  );
};

ActivityLink.propTypes = {
  toPath: PropTypes.string,
  text: PropTypes.string,
};

export default ActivityLink;
