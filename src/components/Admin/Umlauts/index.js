import React, { useState } from 'react';
import PropTypes from 'prop-types';

import upArrow from './up-arrow.svg';
import downArrow from './down-arrow.svg';
import midDot from './mid-dot.svg';
import umlaut from './umlaut.svg';
import lowerA from './lower-a-uml.svg';
import lowerO from './lower-o-uml.svg';
import lowerU from './lower-u-uml.svg';
import upperA from './upper-a-uml.svg';
import upperO from './upper-o-uml.svg';
import upperU from './upper-u-uml.svg';
import sSet from './sset.svg';

const Umlauts = ({ umlautStyles, handleUmlautClick }) => {
  const [isUpper, setIsUpper] = useState(false);

  const handleArrowClick = () => {
    setIsUpper(!isUpper);
  };

  const umlauts = {
    lower: { a: '\u00E4', o: '\u00F6', u: '\u00FC' },
    upper: { a: '\u00C4', o: '\u00D6', u: '\u00DC' },
    um: '\u00A8',
    sset: '\u00DF',
    dot: '\u00B7',
  };

  const umlautClick = (item) => {
    const caseValue = isUpper ? 'upper' : 'lower';
    if (item === 'um' || item === 'sset' || item === 'dot') {
      handleUmlautClick(umlauts[item]);
    } else {
      handleUmlautClick(umlauts[caseValue][item]);
    }
  };

  return (
    <div className="form-umlauts" style={umlautStyles}>
      <div className="form-umlauts__lower">
        <a href="#null" className="form-umlauts__button" onClick={handleArrowClick}>
          <img src={isUpper ? downArrow : upArrow} alt="arrow" />
        </a>
        <a href="#null" className="form-umlauts__button" onClick={() => umlautClick('a')}>
          <img src={isUpper ? upperA : lowerA} alt="a umlaut" />
        </a>
        <a href="#null" className="form-umlauts__button" onClick={() => umlautClick('o')}>
          <img src={isUpper ? upperO : lowerO} alt="o umlaut" />
        </a>
        <a href="#null" className="form-umlauts__button" onClick={() => umlautClick('u')}>
          <img src={isUpper ? upperU : lowerU} alt="u umlaut" />
        </a>
        <a href="#null" className="form-umlauts__button" onClick={() => umlautClick('um')}>
          <img src={umlaut} alt="umlaut" />
        </a>
        <a href="#null" className="form-umlauts__button" onClick={() => umlautClick('sset')}>
          <img src={sSet} alt="sset" />
        </a>
        <a href="#null" className="form-umlauts__button" onClick={() => umlautClick('dot')}>
          <img src={midDot} alt="mid dot" />
        </a>
      </div>
    </div>
  );
};

Umlauts.propTypes = {
  umlautStyles: PropTypes.shape(),
  handleUmlautClick: PropTypes.func,
};

export default Umlauts;
