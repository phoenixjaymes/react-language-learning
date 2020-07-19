import React from 'react';
import PropTypes from 'prop-types';

import CardFaceFront from './CardFaceFront';
import CardFaceBack from './CardFaceBack';
import CardFaceBackVerbAf from './CardFaceBackVerbAf';
import CardFaceBackVerbDe from './CardFaceBackVerbDe';
import CardFaceBackVerbNl from './CardFaceBackVerbNl';

const CardFaceWrap = ({
  cardData, handleFlipClick, handleExamplesToggle, flipClass, exampleClass,
  exampleText, category, lang, id,
}) => {
  let backComponent;

  if (category === 'verb' && lang === 'de') {
    backComponent = (
      <CardFaceBackVerbDe
        cardData={cardData}
        handleFlipClick={handleFlipClick}
        handleExamplesToggle={handleExamplesToggle}
        exampleClass={exampleClass}
        exampleText={exampleText}
        id={id}
      />
    );
  } else if (category === 'verb' && lang === 'af') {
    backComponent = (
      <CardFaceBackVerbAf
        cardData={cardData}
        handleFlipClick={handleFlipClick}
        handleExamplesToggle={handleExamplesToggle}
        exampleClass={exampleClass}
        exampleText={exampleText}
        id={id}
      />
    );
  } else if (category === 'verb' && lang === 'nl') {
    backComponent = (
      <CardFaceBackVerbNl
        cardData={cardData}
        handleFlipClick={handleFlipClick}
        handleExamplesToggle={handleExamplesToggle}
        exampleClass={exampleClass}
        exampleText={exampleText}
        id={id}
      />
    );
  } else {
    backComponent = (
      <CardFaceBack
        cardData={cardData}
        handleFlipClick={handleFlipClick}
        handleExamplesToggle={handleExamplesToggle}
        exampleClass={exampleClass}
        exampleText={exampleText}
      />
    );
  }

  return (
    <div className={`card ${flipClass}`}>
      <CardFaceFront
        cardData={cardData}
        handleFlipClick={handleFlipClick}
      />
      {backComponent}
    </div>
  );
};

CardFaceWrap.propTypes = {
  cardData: PropTypes.shape(),
  handleFlipClick: PropTypes.func,
  handleExamplesToggle: PropTypes.func,
  flipClass: PropTypes.string,
  exampleClass: PropTypes.string,
  exampleText: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
  lang: PropTypes.string,
};

export default CardFaceWrap;
