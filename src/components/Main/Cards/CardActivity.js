import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import ActivityHeader from '../ActivityComponents/ActivityHeader';
import CardFaceWrap from './CardFaceWrap';
import CardControls from './CardControls';
import { LearningContext } from '../../Context';

import './card.css';

const CardActivity = ({ match }) => {
  const { lang } = useContext(LearningContext);
  const { category, id } = match.params;

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const [cardData, setCardData] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [flipClass, setFlipClass] = useState('');
  const [exampleClass, setExampleClass] = useState('');
  const [exampleText, setExampleText] = useState('Examples');

  useEffect(() => {
    const verbTenses = ['present', 'perfect', 'imperfect'];
    const verbGroups = ['separable', 'reflexive', 'dative'];
    let fetchUrl;

    if (category === 'adjective') {
      fetchUrl = `https://phoenixjaymes.com/api/language/adjectivecards?lang=${lang}&cat=${id}`;
    } else if (category === 'noun') {
      fetchUrl = `https://phoenixjaymes.com/api/language/nouncards?lang=${lang}&cat=${id}`;
    } else if (category === 'gender') {
      fetchUrl = `https://phoenixjaymes.com/api/language/nouncards?lang=${lang}&gender=${id}`;
    } else if (category === 'verb' && verbTenses.includes(id)) {
      fetchUrl = `https://phoenixjaymes.com/api/language/verbcards?lang=${lang}&tense=${id}`;
    } else if (category === 'verb' && verbGroups.includes(id)) {
      fetchUrl = `https://phoenixjaymes.com/api/language/verbcards?lang=${lang}&${id}=yes`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/verbcards?lang=${lang}&tense=${id}`;
    }

    fetch(fetchUrl)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          setCardData(responseData.data);
          setCurrentCard(0);
          setTotalCards(responseData.data.length);
          setLoading(false);
        } else if (responseData.status === 'fail') {
          setFetchError(true); console.log('fail');
          setLoading(false);
        } else {
          setFetchError(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('Error fetching anaad parsing data', error);
        setFetchError(true);
        setLoading(false);
      });
  }, [lang, category, id]);

  const handleFlipClick = () => {
    flipClass === 'js-flip-card' ? setFlipClass('') : setFlipClass('js-flip-card');
  };

  const handleExamplesToggle = () => {
    if (exampleClass === '') {
      setExampleClass('showExamples');
      setExampleText('Conjugation');
    } else {
      setExampleClass('');
      setExampleText('Examples');
    }
  };

  const cardNext = () => {
    if (currentCard !== totalCards - 1) {
      setCurrentCard(currentCard + 1);
      setFlipClass('');
      setExampleClass('');
      setExampleText('Examples');
    }
  };

  const cardBack = () => {
    if (currentCard !== 0) {
      setCurrentCard(currentCard - 1);
      setFlipClass('');
      setExampleClass('');
      setExampleText('Examples');
    }
  };

  if (loading === true) {
    return (
      <div>Loading</div>
    );
  }

  if (fetchError === true) {
    return (
      <div>
        <p>Sorry, we&apos;re unable to retrieve data</p>
        <div>
          <Link to="/cards" className="activity_buttons__btn">Back to Cards</Link>
        </div>
      </div>
    );
  }

  const newCurrentCard = currentCard + 1;

  return (
    <ActivityWrap>
      <ActivityHeader
        currentItem={newCurrentCard}
        totalItems={totalCards}
        type="progress"
        heading="test"
        page="cards"
      />

      <div className="cardsWrap">
        <CardFaceWrap
          cardData={cardData[currentCard]}
          handleFlipClick={handleFlipClick}
          handleExamplesToggle={handleExamplesToggle}
          flipClass={flipClass}
          exampleClass={exampleClass}
          exampleText={exampleText}
          category={category}
          id={id}
          lang={lang}
        />
        <CardControls
          currentCard={newCurrentCard}
          totalCards={totalCards}
          cardBack={cardBack}
          cardNext={cardNext}
        />
      </div>

      <div style={{ backgroundColor: '#ffe' }}>&nbsp;</div>
    </ActivityWrap>
  );
};

CardActivity.propTypes = {
  params: PropTypes.shape(),
};

export default CardActivity;
