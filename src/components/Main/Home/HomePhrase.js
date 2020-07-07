import React from 'react';

import styles from './homePhrase.module.css';

const HomePhrase = () => {
  const phrase = {
    english: 'I will keep an eye on you.',
    translation: 'Ich werde dich im Auge behalten.',
  };

  return (
    <div className={styles.phrase}>
      <h2>Daily Phrase</h2>
      <h3 className={styles.phraseTranslation}>{phrase.translation}</h3>
    </div>
  );
};

export default HomePhrase;
