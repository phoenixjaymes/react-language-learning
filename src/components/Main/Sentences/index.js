import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LearningConsumer } from '../../Context';

const SentenceOptionsLinks = ({ lang, categories }) => {
  const buttons = categories.map(option => (
    <Link key={option.id} type="button" to={`/${lang}/sentences/category/${option.id}`} className="activity_buttons__btn">{option.name}</Link>
  ));

  return (
    <div className="activity-buttons activity-categories">
      {buttons}
    </div>
  );
};

SentenceOptionsLinks.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  lang: PropTypes.string.isRequired,
};

const Sentences = () => (
  <LearningConsumer>
    {
      (context) => {
        const { categories, lang, labels } = context;
        const headingLabel = labels.us.languages[lang];
        return (
          <section className="flashcards">
            <h1>{`${headingLabel} Sentences`}</h1>

            <h3>Select your Sentences</h3>

            <div className="activity-buttons activity-categories">
              <Link to={`/${lang}/sentences/type/random`} className="activity_buttons__btn">Random</Link>
              <br />
              <Link to={`/${lang}/sentences/type/1`} className="activity_buttons__btn">Statement</Link>

              <Link to={`/${lang}/sentences/type/2`} className="activity_buttons__btn">Question</Link>

              <Link to={`/${lang}/sentences/type/3`} className="activity_buttons__btn">Answer</Link>
              <br />
              <br />
              { categories.de !== undefined && (
                <SentenceOptionsLinks
                  lang={lang}
                  categories={categories[lang].sentence_cat}
                />
              )}
            </div>
          </section>
        );
      }}
  </LearningConsumer>
);

export default Sentences;
