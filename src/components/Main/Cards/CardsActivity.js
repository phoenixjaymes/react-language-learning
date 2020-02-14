import React from 'react';
import PropTypes from 'prop-types';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import GenericCardWrap from './GenericCardWrap';
import PhraseCard from './PhraseCard';
import VerbCard from './VerbCard';
import VerbCardNl from './VerbCardNl';

import './cards.css';

const CardsActivity = ({ match }) => {
  const { lang, category, id } = match.params;
  let card;
  const heading = category.charAt(0).toUpperCase() + category.slice(1);

  // Get card data based on category
  if (category === 'adjective' || category === 'noun' || category === 'gender' || category === 'study') {
    card = <GenericCardWrap lang={lang} category={category} activityId={id} />;
  } else if (category === 'phrase') {
    card = <PhraseCard lang={lang} category={category} />;
  } else if (lang === 'nl' && category === 'verb') {
    card = <VerbCardNl lang={lang} category={category} activityId={id} />;
  } else if (category === 'verb') {
    card = <VerbCard lang={lang} category={category} activityId={id} />;
  } else {
    card = <GenericCardWrap />;
  }

  return (
    <ActivityWrap
      heading={`${heading} Cards`}
      page={`${lang}/cards`}
    >
      {card}
    </ActivityWrap>
  );
};

CardsActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default CardsActivity;
