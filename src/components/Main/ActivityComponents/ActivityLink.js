import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './activityLink.module.css';

const ActivityLink = ({ toPath, text }) => (
    <Link to={toPath} className={styles.button}>{text}</Link>
  );

ActivityLink.propTypes = {
  toPath: PropTypes.string,
  text: PropTypes.string,
};

export default ActivityLink;
