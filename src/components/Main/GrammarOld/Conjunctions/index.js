import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../../../Context';

import DeConjunctions from './DeConjunctions';
import NlConjunctions from './NlConjunctions';
import ZaConjunctions from './ZaConjunctions';

const Conjunctions = ({ context }) => {
  const { lang, labels } = context;
  const { languages } = labels.us;

  if (lang === 'nl') {
    return <NlConjunctions heading={`${languages[lang]} Conjunctions`} />;
  }

  if (lang === 'af') {
    return <ZaConjunctions heading={`${languages[lang]} Conjunctions`} />;
  }

  return <DeConjunctions heading={`${languages[lang]} Conjunctions`} />;
};

Conjunctions.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(Conjunctions);
