import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './RadioButtons.module.css';

const CategoryRadioButtons = ({ handleRadio }) => {
  const [itemType, setItemType] = useState('word');

  const handleChange = (catType) => {
    handleRadio(catType);
    setItemType(catType);
  };

  return (
    <div className={styles.buttonWrap}>
      <p className={styles.pText}><span>Category Type</span></p>
      <label
        className={styles.label}
        htmlFor="categoryPhrase"
      >
        <input
          className={styles.radio}
          type="radio"
          id="categoryPhrase"
          name="itemType"
          value="phrase"
          checked={itemType === 'phrase'}
          onChange={() => handleChange('phrase')}
        />
        Phrase
      </label>

      <label
        className={styles.label}
        htmlFor="categorySentence"
      >
        <input
          className={styles.radio}
          type="radio"
          id="categorySentence"
          name="itemType"
          value="sentence"
          checked={itemType === 'sentence'}
          onChange={() => handleChange('sentence')}
        />
        Sentence
      </label>

      <label className={styles.label} htmlFor="categoryWord">
        <input
          className={styles.radio}
          type="radio"
          id="categoryWord"
          name="itemType"
          value="word"
          checked={itemType === 'word'}
          onChange={() => handleChange('word')}
        />
        Word
      </label>
    </div>
  );
};

CategoryRadioButtons.propTypes = {
  handleRadio: PropTypes.func,
};

export default CategoryRadioButtons;
