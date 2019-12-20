import React from 'react';
import PropTypes from 'prop-types';
import { LearningConsumer } from '../../Context';

import Verb from './Verb';
import VerbNl from './VerbNl';
import VerbZA from './VerbZA';
import VerbDelete from './VerbDelete';
import VerbPerfect from './VerbPerfect';
import VerbPerfectNl from './VerbPerfectNl';
import VerbPerfectZA from './VerbPerfectZA';
import VerbImperfect from './VerbImperfect';
import VerbImperfectNl from './VerbImperfectNl';
import VerbImperfectZA from './VerbImperfectZA';

const VerbContent = ({ cat, modifyType }) => {
  return (
    <LearningConsumer>
      {
      (context) => {
        const { lang } = context;

        if (cat === 'verb' && modifyType === 'delete') {
          return <VerbDelete />;
        }

        if (cat === 'verb') {
          if (lang === 'nl') {
            return <VerbNl categoryName={cat} modifyType={modifyType} />;
          }

          if (lang === 'za') {
            return <VerbZA categoryName={cat} modifyType={modifyType} />;
          }

          return <Verb categoryName={cat} modifyType={modifyType} />;
        }

        if (cat === 'perfect') {
          if (lang === 'nl') {
            return <VerbPerfectNl categoryName={cat} modifyType={modifyType} />;
          }

          if (lang === 'za') {
            return <VerbPerfectZA categoryName={cat} modifyType={modifyType} />;
          }

          return <VerbPerfect categoryName={cat} modifyType={modifyType} />;
        }

        if (cat === 'imperfect') {
          if (lang === 'nl') {
            return <VerbImperfectNl categoryName={cat} modifyType={modifyType} />;
          }

          if (lang === 'za') {
            return <VerbImperfectZA categoryName={cat} modifyType={modifyType} />;
          }

          return <VerbImperfect categoryName={cat} modifyType={modifyType} />;
        }
        return null;
      }
    }
    </LearningConsumer>
  );
};

VerbContent.propTypes = {
  cat: PropTypes.string,
  modifyType: PropTypes.string,
};

export default VerbContent;
