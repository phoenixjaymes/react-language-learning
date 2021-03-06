import React from 'react';
import PropTypes from 'prop-types';

import TableWrap from '../TableWrap';
import DataTable from '../DataTable';
import DePossessiveTable from './DePossessiveTable';

import { germanPersonalPronouns, germanReflexivePronouns } from '../grammerData';

const DePronouns = ({ heading }) => (
  <div className="grammar__container">
    <h1 className="home__title">{heading}</h1>

    <p>In German grammar, pronouns are declined or inflected depending on what case they are in.</p>

    <h2>Personal Pronouns</h2>
    <TableWrap>
      <DataTable dataType="pronoun" data={germanPersonalPronouns} />
    </TableWrap>

    <h2>Possessive Pronouns</h2>
    <TableWrap>
      <DePossessiveTable />
    </TableWrap>

    <h2>Reflexive Pronouns</h2>
    <TableWrap>
      <DataTable dataType="pronoun" data={germanReflexivePronouns} />
    </TableWrap>
  </div>
);

DePronouns.propTypes = {
  heading: PropTypes.string,
};

export default DePronouns;
