import React from 'react';
import PropTypes from 'prop-types';

import DefinitionList from '../DefinitionList';
import prepositionLists from './prepositions';

const DePrepositions = ({ heading }) => (
  <div className="grammar__container">
    <h1 className="home__title">{heading}</h1>

    <p>Prepositions show direction, location, or time, or introduce an object. They are usually followed by an object—a noun, noun phrase, or pronoun.</p>

    <p>Prepositions typically show how the noun, noun phrase, or pronoun is related to another word in the sentence. </p>

    <p>Prepositions in German grammar can indicate the case of the nouns, pronouns or articles that follow them. Some prepositions are always followed by the accusative case, others take the dative or genitive case. There are also two-way prepositions that can take either the accusative or dative case.</p>

    <h2>Accusative Prepositions </h2>
    <DefinitionList definitions={prepositionLists.de.accusative} />

    <h2>Dative Prepositions</h2>
    <DefinitionList definitions={prepositionLists.de.dative} />

    <h2>Two-way Prepositions</h2>
    <DefinitionList definitions={prepositionLists.de.twoWay} />

    {/* <h2>Genitive Prepositions</h2>
    <DefinitionList definitions={prepositionLists.de.genitive} /> */}
  </div>
);

DePrepositions.propTypes = {
  heading: PropTypes.string,
};

export default DePrepositions;
