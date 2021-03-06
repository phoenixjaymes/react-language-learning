import React from 'react';
import PropTypes from 'prop-types';

import TableWrap from '../TableWrap';
import DataTable from '../DataTable';

import germanDefiniteArticles, { germanIndefiniteArticles } from '../grammerData';

const DeArticles = ({ heading }) => {
  return (
    <div className="grammar__container">
      <h1>{heading}</h1>
  
      <p>The German articles <strong>der</strong> and <strong>ein</strong> change form, are declined, depending on the gender, case and number.</p>

      <p><strong>The four German cases:</strong></p>
      <ul>
        <li>Nominative</li>
        <li>Accusative</li>
        <li>Dative</li>
        <li>Genitive</li>
      </ul>
  
      <h2>Definite Article</h2>
      <p>The definite article in German, like in English, is used when one refers to a particular object.</p>

      <TableWrap>
        <DataTable dataType="article" data={germanDefiniteArticles} />
      </TableWrap>
      
      <h2>Indefinite Article</h2>
      <p>The indefinite article in German, also like in English, is used when one refers to a nonspecific object.</p>

      <TableWrap>
        <DataTable dataType="article" data={germanIndefiniteArticles} />
      </TableWrap>

    </div>
  );
};

DeArticles.propTypes = {
  heading: PropTypes.string,
};

export default DeArticles;
