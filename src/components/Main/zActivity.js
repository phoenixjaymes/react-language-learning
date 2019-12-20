import React from 'react';
import CardsActivity from './CardsActivity';
import WordsActivity from './WordsActivity';
import SentencesActivity from './SentencesActivity';

const Activity = (props) => {
  let activityType =  props.type;
  let activityCategory;
  let activityGroup;
  let activityId = props.match.params.id;
  let lang = props.match.params.lang;

  if (props.match.params.category !== undefined) {
    activityCategory = props.match.params.category;
  } else {
    activityGroup = props.match.params.group;
  }


  if (activityType === 'cards') {
    return (
      <CardsActivity
        activityType={activityType}
        activityCategory={activityCategory}
        activityId={activityId}
        lang={lang}
      />
    );
  } else if (activityType === 'words') {
    return (
      <WordsActivity 
        activity={activityType}
        activityCategory={activityCategory}
        lang={lang}
      />
    );
  } else if (activityType === 'sentences') {
    return (
      <SentencesActivity 
        activity={activityType}
        activityGroup={activityGroup}
        activityId={activityId}
        lang={lang}
      />
    );
  }
}

export default Activity;