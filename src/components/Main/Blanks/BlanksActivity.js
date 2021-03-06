import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LearningContext } from '../../Context';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import ActivityHeader from '../ActivityComponents/ActivityHeader';
import ActivityAnswer from '../ActivityComponents/ActivityAnswer';
import BlanksOptionsBtn from './BlanksOptionBtn';
import FinalMessage from '../FinalMessage';

import styles from './blanksActivity.module.css';

const BlanksActivity = ({ match }) => {
  const { lang } = useContext(LearningContext);
  const [isFinalMessageVisible, setIsFinalMessageVisible] = useState(false);
  const { category } = match.params;

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [buttonToShow, setButtonToShow] = useState(undefined);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);
  const [blanks, setBlanks] = useState([]);
  const [answer, setAnswer] = useState('');
  const [sentenceArray, setSentenceArray] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
  const [blankIndex, setBlankIndex] = useState('');
  const [wordOptionsArray, setWordOptionsArray] = useState([]);

  const makeWordObjects = (words) => {
    const arrWords = [];
    words.split(',').forEach((item, i) => {
      arrWords.push({ id: i, word: item.trim() });
    });
    return arrWords;
  };

  useEffect(() => {
    fetch(
      `https://phoenixjaymes.com/api/language/blanks?lang=${lang}&cat=${category}&limit=yes`,
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          const data = responseData.data[0];

          setBlanks(responseData.data);
          setSentenceArray(data.sentence.split(' '));
          setAnswer(data.answer);
          setAnswerArray(data.answer.split(' '));
          setBlankIndex(data.sentence.split(' ').indexOf('_'));
          setWordOptionsArray(makeWordObjects(data.words));
          setTotalSentences(responseData.data.length);
          setIsLoading(false);
        } else {
          console.log(responseData);
          setIsLoading(false);
          setFetchError(true);
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        setIsLoading(false);
        setFetchError(true);
      });
  }, [lang, category]);

  const answerWordClick = (word) => {
    if (buttonToShow === 'continue') {
      return;
    }

    const oldArray = sentenceArray;
    oldArray.splice(blankIndex, 1, word);

    setSentenceArray(oldArray);
    setButtonToShow('check');

    // this.setState((prevState) => {
    //   const oldArray = prevState.sentenceArray;
    //   oldArray.splice(blankIndex, 1, word);

    //   return {
    //     sentenceArray: oldArray,
    //     buttonToShow: 'check',
    //   };
    // });
  };

  const handleCheckClick = () => {
    if (sentenceArray.join(' ') === answerArray.join(' ')) {
      setIsCorrect(true);
      setButtonToShow('continue');
    } else {
      setIsCorrect(false);
      setButtonToShow('continue');
    }
  };

  const handleContinueClick = () => {
    if (currentSentence < totalSentences - 1) {
      const sentenceNum = currentSentence + 1;

      setButtonToShow(undefined);
      setCurrentSentence(sentenceNum);
      setIsCorrect(undefined);
      setSentenceArray(blanks[sentenceNum].sentence.split(' '));
      setBlankIndex(blanks[sentenceNum].sentence.split(' ').indexOf('_'));
      setAnswer(blanks[sentenceNum].answer);
      setAnswerArray(blanks[sentenceNum].answer.split(' '));
      setWordOptionsArray(makeWordObjects(blanks[sentenceNum].words));

      // this.setState((prevState) => {
      //   const sentenceNum = prevState.currentSentence + 1;

      //   return {
      //     buttonToShow: undefined,
      //     currentSentence: sentenceNum,
      //     // sentenceWordsArray: [],
      //     isCorrect: undefined,
      //     sentenceArray: blanks[sentenceNum].sentence.split(' '),
      //     blankIndex: blanks[sentenceNum].sentence.split(' ').indexOf('_'),
      //     answer: blanks[sentenceNum].answer,
      //     answerArray: blanks[sentenceNum].answer.split(' '),
      //     wordOptionsArray: makeWordObjects(blanks[sentenceNum].words),
      //   };
      // });
    } else {
      setButtonToShow('finish');
      setIsCorrect(undefined);
    }
  };

  const handleFinishClick = () => {
    setIsCorrect(undefined);
    setButtonToShow(undefined);
    setIsFinalMessageVisible(true);
  };

  const sentenceWithBlanks = sentenceArray.map((word, i) => {
    if (word === '_') {
      return (
        <span key={i} className={styles.sentenceWordBlank}>
          {' '}
          &nbsp;
          {' '}
        </span>
      );
    }

    if (i === blankIndex) {
      return (
        <span key={i} className={styles.sentenceWordUnderlined}>
          {word}
          {' '}
        </span>
      );
    }

    return (
      <span key={i} className={styles.sentenceWord}>
        {word}
        {' '}
      </span>
    );
  });

  const wordOptions = wordOptionsArray.map((word) => (
    <li key={word.id} className={styles.blankOptionsLi}>
      <BlanksOptionsBtn label={word.word} handleClick={answerWordClick} />
    </li>
  ));

  if (isLoading === true) {
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

  return (
    <ActivityWrap>
      <ActivityHeader
        currentItem={currentSentence}
        totalItems={totalSentences}
        type="progress"
        heading="test"
        page="blanks"
      />

      <div className={styles.wrap}>
        <div>
          <h3 className={styles.heading}>Fill in the Blank</h3>
          <p className={styles.sentence}>{sentenceWithBlanks}</p>

          <ul className={styles.blankOptionsUl}>{wordOptions}</ul>
        </div>
      </div>

      <ActivityAnswer
        buttonToShow={buttonToShow}
        handleCheckClick={handleCheckClick}
        handleContinueClick={handleContinueClick}
        handleFinishClick={handleFinishClick}
        isCorrect={isCorrect}
        answer={answer}
      />

      {isFinalMessageVisible && (
        <FinalMessage
          type="blanks"
          lang={lang}
        />
      )}
    </ActivityWrap>
  );
};

BlanksActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default BlanksActivity;
