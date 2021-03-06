import React from 'react';
import PropTypes from 'prop-types';

import DefinitionList from '../DefinitionList';
import prepositionLists from './prepositions';

const DePrepositions = ({ heading }) => (
  <div className="grammar__container">
    <h1 className="home__title">{heading}</h1>

    <p>Prepositions show direction, location, or time, or introduce an object. They are usually followed by an object—a noun, noun phrase, or pronoun.</p>

    <p>Prepositions typically show how the noun, noun phrase, or pronoun is related to another word in the sentence. </p>

    <h2>Prepositions </h2>
    <DefinitionList definitions={prepositionLists.nl.all} />

    {/* <h2>Circumpositions</h2>
    <DefinitionList definitions={prepositionLists.nl.dative} /> */}
  </div>
);

DePrepositions.propTypes = {
  heading: PropTypes.string,
};

export default DePrepositions;
