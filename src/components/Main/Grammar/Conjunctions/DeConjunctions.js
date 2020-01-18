import React from 'react';
import PropTypes from 'prop-types';

import DefinitionList from '../DefinitionList';
import conjunctionLists from './conjunctions';

const DeConjunctions = ({ heading }) => (
  <div className="grammar__container">
    <h1 className="home__title">{heading}</h1>

    <p>A word used to connect clauses or sentences or to coordinate words in the same clause
      (e.g. and, but, or, if). Conjunctions allow you to form complex sentences.</p>

    <p>Subordinating conjunctions affect the structure of the sentence by changing the position of the verb while coordinating conjunctions leave the position of the verb unchanged.</p>

    <h2>Coordinate Conjunctions </h2>
    <DefinitionList definitions={conjunctionLists.de.coordinate} />

    <h2>Subordinate Conjunctions</h2>
    <DefinitionList definitions={conjunctionLists.de.subordinate} />

    <h2>Compound Conjunctions</h2>
    <DefinitionList definitions={conjunctionLists.de.compound} />

  </div>
);

DeConjunctions.propTypes = {
  heading: PropTypes.string,
};

export default DeConjunctions;
