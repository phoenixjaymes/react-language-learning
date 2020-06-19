import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../../../Context';

import DeArticles from './DeArticles';
import NlArticles from './NlArticles';
import ZaArticles from './ZaArticles';

const Articles = ({ context }) => {
  const { lang, labels } = context;
  const { languages } = labels.us;

  if (lang === 'nl') {
    return <NlArticles heading={`${languages[lang]} Articles`} />;
  }

  if (lang === 'af') {
    return <ZaArticles heading={`${languages[lang]} Articles`} />;
  }

  return <DeArticles heading={`${languages[lang]} Articles`} />;
};

Articles.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(Articles);
