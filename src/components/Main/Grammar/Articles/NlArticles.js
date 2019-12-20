import React from 'react';
import PropTypes from 'prop-types';

import DataTable from '../DataTable';

import { dutchDefiniteArticles } from '../grammerData';

const DeArticles = ({ heading }) => {

  return (
    <div className="grammar__container">
      <h1>{heading}</h1>

      <p>The Dutch articles are <strong>de</strong> (common) and <strong>het</strong> (neuter).</p>

      <h2>Definite Article</h2>
      <p>The Dutch definite article is used, like in English, when one refers to a particular object.</p>

      <DataTable dataType="article" data={dutchDefiniteArticles} />

      <h2>Indefinite Article</h2>
      <p>The indefinite article in Dutch, also like in English, is used when one refers to a nonspecific object.</p>

      <p>The indefinte article in Dutch is <strong>een</strong>.</p>

    </div>
  );
};

DeArticles.propTypes = {
  heading: PropTypes.string,
};

export default DeArticles;
