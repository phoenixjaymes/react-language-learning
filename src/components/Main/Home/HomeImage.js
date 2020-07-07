import React, { useContext } from 'react';
import { LearningContext } from '../../Context';

import styles from './homeImage.module.css';

import imgDE from './germany.jpg';
import imgNL from './netherlands.jpg';
import imgAF from './africa.jpg';

const HomeImage = () => {
  const value = useContext(LearningContext);
  let img;

  switch (value.lang) {
    case 'de':
      img = imgDE;
      break;
    case 'nl':
      img = imgNL;
      break;
    case 'af':
      img = imgAF;
      break;
    default:
      img = imgDE;
      break;
  }

  return (
    <div className={styles.imgWrap}>
      <img className="home__image" src={img} alt="flashcard logo" />
    </div>
  );
};

export default HomeImage;
