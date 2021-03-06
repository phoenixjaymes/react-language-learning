import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LearningContext } from '../../Context';

import ActivityAnswer from '../ActivityComponents/ActivityAnswer';
import SentenceWordBtn from './SentenceWordBtn';
import ActivityWrap from '../ActivityComponents/ActivityWrap';
import ActivityHeader from '../ActivityComponents/ActivityHeader';
import FinalMessage from '../FinalMessage';

import './sentences.css';

import styles from './sentenceActivity.module.css';

const SentencesActivity = ({ match }) => {
  const { lang } = useContext(LearningContext);
  const [isShownMessage, setIsShownMessage] = useState(false);
  const { category, id } = match.params;

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [buttonToShow, setButtonToShow] = useState(undefined);
  const [boardHeading, setBoardHeading] = useState('');
  const [sentence, setSentence] = useState('');
  const [sentences, setSentences] = useState([]);
  const [sentenceWordsArray, setSentenceWordsArray] = useState([]);
  const [answerWordsArray, setAnswerWordsArray] = useState([]);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [answer, setAnswer] = useState('');
  const [currentSentence, setCurrentSentence] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);

  useEffect(() => {
    let fetchUrl;

    const sentenceList = (list) => {
      let newHeading;

      if (list[0].type === '1') {
        newHeading = 'Create the Sentence';
      } else if (list[0].type === '2') {
        newHeading = 'Create the Question';
      } else if (list[0].type === '3') {
        newHeading = 'Answer the Question';
      } else {
        newHeading = 'Make something sensible';
      }

      setSentences(list);
      setTotalSentences(list.length);
      setBoardHeading(newHeading);
      setSentence(list[0].sentence);
      //   type: list[0].type,
      //   category: list[0].category,
      setAnswer(list[0].answer1);
      // words: list[0].words,
      setAnswerWordsArray(list[0].words);
      // extra words coming later
    };

    if (category === 'type') {
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}&type=${id}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}&cat=${id}`;
    }

    fetch(fetchUrl)
      .then((reponse) => reponse.json())
      .then((responseData) => sentenceList(responseData.data.slice(0, 5)))
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        setIsLoading(false);
        setFetchError(true);
      });
  }, [category, id, lang]);

  const answerWordClick = (i) => {

    if (buttonToShow === 'continue' || buttonToShow === 'finish') {
      return;
    }

    const oldArray = answerWordsArray;
    const removedWord = oldArray.splice(i, 1).toString();
    sentenceWordsArray.push(removedWord);

    setAnswerWordsArray(oldArray);
    // setSentenceWordsArray();
    setButtonToShow('check');
    // canCheck: true,

    // this.setState((prevState) => {
    //   const oldArray = prevState.answerWordsArray;
    //   const removedWord = oldArray.splice(i, 1).toString();
    //   prevState.sentenceWordsArray.push(removedWord);

    //   return {
    //     answerWordsArray: oldArray,
    //     // buttonToShow: 'check',
    //     // canCheck: true,
    //   };
    // });
  };

  const sentenceWordClick = (i) => {
    if (buttonToShow === 'continue' || buttonToShow === 'finish') {
      return;
    }

    const oldArray = sentenceWordsArray;
    const removedWord = oldArray.splice(i, 1);
    answerWordsArray.push(removedWord);

    // new needs a fix
    setSentenceWordsArray(oldArray);

    // this.setState((prevState) => {
    //   const oldArray = prevState.sentenceWordsArray;
    //   const removedWord = oldArray.splice(i, 1);
    //   prevState.answerWordsArray.push(removedWord);

    //   return {
    //     sentenceWordsArray: oldArray,
    //   };
    // });
  };

  const handleCheckClick = () => {
    if (answer === sentenceWordsArray.join(' ')) {
      setButtonToShow('continue');
      setIsCorrect(true);
    } else {
      setButtonToShow('continue');
      setIsCorrect(false);
    }
  };

  const handleContinueClick = () => {
    const sentenceNum = currentSentence + 1;
    if (currentSentence < totalSentences - 1) {
      let newHeading;

      if (sentences[sentenceNum].type === '1') {
        newHeading = 'Create the Sentence';
      } else if (sentences[sentenceNum].type === '2') {
        newHeading = 'Create the Question';
      } else if (sentences[sentenceNum].type === '3') {
        newHeading = 'Answer the Question';
      } else {
        newHeading = 'Make something sensible';
      }

      // New
      setButtonToShow(undefined);
      setCurrentSentence(sentenceNum);
      setSentenceWordsArray([]);
      setIsCorrect(undefined);
      setBoardHeading(newHeading);
      setSentence(sentences[sentenceNum].sentence);
      // type: prevState.sentences[sentenceNum].type,
      // category: prevState.sentences[sentenceNum].category,
      setAnswer(sentences[sentenceNum].answer1);
      // words: prevState.sentences[sentenceNum].words,
      setAnswerWordsArray(sentences[sentenceNum].words);
    } else {
      setButtonToShow('finish');
      setIsCorrect(undefined);
    }
  };

  const handleFinishClick = () => {
    setButtonToShow(undefined);
    setIsCorrect(undefined);
    setIsShownMessage(true);
  };

  const sentenceWords = sentenceWordsArray.map((word, i) => (
    <li key={i} className="sentences__item">
      <SentenceWordBtn label={word} id={i} handleClick={sentenceWordClick} />
    </li>
  ));

  const answerWords = answerWordsArray.map((word, i) => (
    <li key={i} className="sentences__item">
      <SentenceWordBtn label={word} id={i} handleClick={answerWordClick} />
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
      <div>
        <ActivityHeader
          currentItem={currentSentence}
          totalItems={totalSentences}
          type="progress"
          page="sentences"
        />
      </div>

      <div className={styles.wrap}>
        <div className="sentences__words">
          <h3 className={styles.heading}>{boardHeading}</h3>
          <p className={styles.sentence}>{sentence}</p>

          <ul className={styles.wordsWrap}>{sentenceWords}</ul>

          <ul className={styles.wordsWrap} style={{ borderTop: '1px dotted #999', borderRadius: 'none' }}>{answerWords}</ul>
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

      {
        isShownMessage && (
          <FinalMessage
            type="sentences"
            lang={lang}
          />
        )
      }
    </ActivityWrap>
  );
};

SentencesActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default SentencesActivity;
