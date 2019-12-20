import React from 'react';
import PropTypes from 'prop-types';

const ZaArticles = ({ heading }) => {
  return (
    <div className="grammar__container">
      <h1>{heading}</h1>
  
      <p>The Afrikaans articles are <strong>die</strong> and <strong>&apos;n</strong>.</p>

  
      <h2>Definite Article</h2>
      <p>The definite article in Afrikaans, like in English, is used when one refers to a particular object.</p>
      <p>The definite article is <strong>die</strong></p>
      
      <h2>Indefinite Article</h2>
      <p>The indefinite article in Afrikaans, also like in English, is used when one refers to a nonspecific object.</p>
      <p>The indefinite article is <strong>&apos;n</strong></p>

    </div>
  );
};

ZaArticles.propTypes = {
  heading: PropTypes.string,
};

export default ZaArticles;
