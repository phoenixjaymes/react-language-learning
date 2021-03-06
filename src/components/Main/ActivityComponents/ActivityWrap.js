import React from 'react';
import PropTypes from 'prop-types';

import styles from './activityWrap.module.css';

const ActivityWrap = ({ heading, page, children }) => {
  return (
    <div className={styles.activity}>
      <div className={styles.wrap}>
        {children}
      </div>
    </div>
  );
};

ActivityWrap.propTypes = {
  heading: PropTypes.string,
  page: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default ActivityWrap;
