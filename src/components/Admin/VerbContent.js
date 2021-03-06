import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import Verb from './Verb';
import VerbNl from './VerbNl';
import VerbAF from './VerbAF';
import VerbDelete from './VerbDelete';
import VerbPerfect from './VerbPerfect';
import VerbPerfectNl from './VerbPerfectNl';
import VerbPerfectAF from './VerbPerfectAF';
import VerbImperfect from './VerbImperfect';
import VerbImperfectNl from './VerbImperfectNl';
import VerbImperfectAF from './VerbImperfectAF';

const VerbContent = ({ cat, modifyType, updateId }) => {
  const { lang } = useContext(LearningContext);

  if (cat === 'verb' && modifyType === 'delete') {
    return <VerbDelete />;
  }

  if (cat === 'verb') {
    if (lang === 'nl') {
      return <VerbNl categoryName={cat} modifyType={modifyType} updateId={updateId} />;
    }

    if (lang === 'af') {
      return <VerbAF categoryName={cat} modifyType={modifyType} updateId={updateId} />;
    }

    return <Verb categoryName={cat} modifyType={modifyType} updateId={updateId} />;
  }

  if (cat === 'perfect') {
    if (lang === 'nl') {
      return <VerbPerfectNl categoryName={cat} modifyType={modifyType} updateId={updateId} />;
    }

    if (lang === 'af') {
      return <VerbPerfectAF categoryName={cat} modifyType={modifyType} updateId={updateId} />;
    }

    return <VerbPerfect categoryName={cat} modifyType={modifyType} updateId={updateId} />;
  }

  if (cat === 'imperfect') {
    if (lang === 'nl') {
      return <VerbImperfectNl categoryName={cat} modifyType={modifyType} updateId={updateId} />;
    }

    if (lang === 'af') {
      return <VerbImperfectAF categoryName={cat} modifyType={modifyType} updateId={updateId} />;
    }

    return <VerbImperfect categoryName={cat} modifyType={modifyType} updateId={updateId} />;
  }
  return null;
};

VerbContent.propTypes = {
  cat: PropTypes.string,
  modifyType: PropTypes.string,
  updateId: PropTypes.string,
};

export default VerbContent;
