import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../../../Context';

import DePrepositions from './DePrepositions';
import NlPrepositions from './NlPrepositions';
import ZaPrepositions from './ZaPrepositions';

const prepositions = ({ context }) => {
  const { lang, labels } = context;
  const { languages } = labels.us;

  if (lang === 'nl') {
    return <NlPrepositions heading={`${languages[lang]} Prepositions`} />;
  }

  if (lang === 'af') {
    return <ZaPrepositions heading={`${languages[lang]} Prepositions`} />;
  }

  return <DePrepositions heading={`${languages[lang]} Prepositions`} />;
};

prepositions.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(prepositions);
