import React from 'react';
import PropTypes from 'prop-types';

import withContext from '../../../Context';

import DePronouns from './DePronouns';

const Pronouns = ({ context }) => {
  const { lang, labels } = context;
  const { languages } = labels.us;

  if (lang === 'nl') {
    return <DePronouns heading={`${languages[lang]} Pronouns`} />;
  }

  if (lang === 'af') {
    return <DePronouns heading={`${languages[lang]} Pronouns`} />;
  }

  return <DePronouns heading={`${languages[lang]} Pronouns`} />;
};

Pronouns.propTypes = {
  context: PropTypes.shape(),
};

export default withContext(Pronouns);
