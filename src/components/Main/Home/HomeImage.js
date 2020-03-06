import React from 'react';
import { LearningConsumer } from '../Context';

import imgDe from '../home-img-de.svg';
import imgNl from '../home-img-nl.svg';

const HomeImage = () => (
  <LearningConsumer>
    {
      (context) => {
        const img = context.lang === 'de' ? imgDe : imgNl;
        return (
          <img className="home__image" src={img} alt="flashcard logo" />
        );
      }
    }
  </LearningConsumer>
);

export default HomeImage;
