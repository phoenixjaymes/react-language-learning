import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './activityLink.module.css';

const ActivityLink = ({ toPath, text }) => {
  const arrText = text.split('-');

  if (arrText.length > 1) {
    const ucText1 = arrText[0].trim().charAt(0).toUpperCase() + arrText[0].slice(1).trim();
    const ucText2 = arrText[1].trim().charAt(0).toUpperCase() + arrText[1].trim().slice(1);

    return (
      <Link to={toPath} className={styles.button}>
        <span className={styles.spanWrap}>
          <span>
            {ucText1}
            <br />
            {ucText2}
          </span>
        </span>
      </Link>
    );
  }

  const ucText = arrText[0].trim().charAt(0).toUpperCase() + arrText[0].slice(1).trim();
  return (
    <Link to={toPath} className={styles.button}>
      <span className={styles.spanWrap}>
        <span>
          {ucText}
        </span>
      </span>
    </Link>
  );
};

ActivityLink.propTypes = {
  toPath: PropTypes.string,
  text: PropTypes.string,
};

export default ActivityLink;
