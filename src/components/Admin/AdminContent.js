import React from 'react';
import PropTypes from 'prop-types';

// Components
import Adjective from './Adjective';
import AdjectiveDelete from './AdjectiveDelete';

import Blank from './Blank';
import BlankDelete from './BlankDelete';

import Category from './Category';
import CategoryDelete from './CategoryDelete';

import Grammar from './Grammar';
import GrammarDelete from './GrammarDelete';

import Noun from './Noun';
import NounDelete from './NounDelete';

import Phrase from './Phrase';
import PhraseDelete from './PhraseDelete';

import Sentence from './Sentence';
import SentenceDelete from './SentenceDelete';

import VerbContent from './VerbContent';
import NotFound from './NotFound';


const AdminContent = ({ match }) => {
  const { category, modifyType, updateId } = match.params;
  const cat = category;

  // Adjectives componets
  if (cat === 'adjective' && modifyType === 'delete') {
    return <AdjectiveDelete />;
  }

  if (cat === 'adjective') {
    return (
      <Adjective categoryName={cat} modifyType={modifyType} updateId={updateId} />
    );
  }

  // Blanks componets
  if (cat === 'blank' && modifyType === 'delete') {
    return <BlankDelete />;
  }

  if (cat === 'blank') {
    return (
      <Blank categoryName={cat} modifyType={modifyType} updateId={updateId} />
    );
  }

  // Category componets
  if (cat === 'category' && modifyType === 'delete') {
    return <CategoryDelete />;
  }

  if (cat === 'category') {
    return <Category categoryName={cat} modifyType={modifyType} updateId={updateId} />;
  }

  // Grammar componets
  if (cat === 'grammar' && modifyType === 'delete') {
    return <GrammarDelete />;
  }

  if (cat === 'grammar') {
    return (
      <Grammar categoryName={cat} modifyType={modifyType} updateId={updateId} />
    );
  }

  // Noun componets
  if (cat === 'noun' && modifyType === 'delete') {
    return <NounDelete />;
  }

  if (cat === 'noun') {
    return (
      <Noun categoryName={cat} modifyType={modifyType} updateId={updateId} />
    );
  }

  // Phrase componets
  if (cat === 'phrase' && modifyType === 'delete') {
    return <PhraseDelete />;
  }

  if (cat === 'phrase') {
    return (
      <Phrase categoryName={cat} modifyType={modifyType} updateId={updateId} />
    );
  }

  // Sentence componets
  if (cat === 'sentence' && modifyType === 'delete') {
    return <SentenceDelete />;
  }

  if (cat === 'sentence') {
    return (
      <Sentence
        categoryName={cat}
        modifyType={modifyType}
        updateId={updateId}
      />
    );
  }

  // Verb components
  if (cat === 'verb' || cat === 'perfect' || cat === 'imperfect') {
    return <VerbContent cat={cat} modifyType={modifyType} updateId={updateId} />;
  }

  return <NotFound />;
};

AdminContent.propTypes = {
  match: PropTypes.shape(),
};

export default AdminContent;
