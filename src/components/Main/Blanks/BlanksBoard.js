import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SentenceSolution from '../Sentences/SentenceSolution';
import SentenceCheck from '../Sentences/SentenceCheck';
import ActivityBtnBlank from '../ActivityComponents/ActivityBtnBlank';

class BlanksBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: false,

      buttonToShow: undefined,
      isCorrect: undefined,

      boardHeading: '',

      currentSentence: 0,
      totalSentences: 0,
      blanks: [],
      sentence: '',
      answer: '',
      sentenceArray: [],
      answerArray: [],
      blankIndex: '',
      wordOptionsArray: [],
    };
  }

  componentDidMount() {
    const { lang, category } = this.props;

    fetch(
      `https://phoenixjaymes.com/api/language/blanks?lang=${lang}&cat=${category}`
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          const data = responseData.data[0];

          this.setState({
            blanks: responseData.data,
            sentenceArray: data.sentence.split(' '),
            answer: data.answer,
            answerArray: data.answer.split(' '),
            blankIndex: data.sentence.split(' ').indexOf('_'),
            wordOptionsArray: this.makeWordObjects(data.words),
            totalSentences: responseData.data.length,
            isLoaded: true,
          });
        } else {
          console.log(responseData);
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  makeWordObjects = (words) => {
    const arrWords = [];
    words.split(',').forEach((item, i) => {
      arrWords.push({ id: i, word: item.trim() });
    });
    return arrWords;
  }

  answerWordClick = (word) => {
    const { blankIndex, buttonToShow } = this.state;

    if (buttonToShow === 'continue') {
      return;
    }

    this.setState((prevState) => {
      const oldArray = prevState.sentenceArray;
      oldArray.splice(blankIndex, 1, word);

      return {
        sentenceArray: oldArray,
        buttonToShow: 'check',
      };
    });
  };

  checkSentenceClick = () => {
    const { sentenceArray, answerArray } = this.state;

    if (sentenceArray.join(' ') === answerArray.join(' ')) {
      this.setState({ isCorrect: true, buttonToShow: 'continue' });
    } else {
      this.setState({ isCorrect: false, buttonToShow: 'continue' });
    }
  };

  continueSentencesClick = () => {
    const { blanks, currentSentence, totalSentences } = this.state;

    if (currentSentence < totalSentences - 1) {
      this.setState((prevState) => {
        const sentenceNum = prevState.currentSentence + 1;

        return {
          buttonToShow: undefined,
          currentSentence: sentenceNum,
          sentenceWordsArray: [],
          isCorrect: undefined,
          sentenceArray: blanks[sentenceNum].sentence.split(' '),
          blankIndex: blanks[sentenceNum].sentence.split(' ').indexOf('_'),
          answer: blanks[sentenceNum].answer,
          answerArray: blanks[sentenceNum].answer.split(' '),
          wordOptionsArray: this.makeWordObjects(blanks[sentenceNum].words),
        };
      });
    } else {
      this.setState({
        buttonToShow: 'finish',
        isCorrect: undefined,
      });
    }
  };

  finishSentencesClick = () => {
    const { showMessage } = this.props;
    this.setState({
      buttonToShow: undefined,
      isCorrect: undefined,
    });
    showMessage(true);
  };

  render() {
    const {
      sentenceArray,
      wordOptionsArray,
      buttonToShow,
      boardHeading,
      sentence,
      isCorrect,
      answer,
      blankIndex,
    } = this.state;

    const sentenceWithBlanks = sentenceArray.map((word, i) => {
      if (word === '_') {
        return (
          <span key={i} className="sentences__word blank">
            {' '}
            &nbsp;
            {' '}
          </span>
        );
      }

      if (i === blankIndex) {
        return (
          <span key={i} className="sentences__word underline">
            {word}
            {' '}
          </span>
        );
      }

      return (
        <span key={i} className="sentences__word">
          {word}
          {' '}
        </span>
      );
    });

    const wordOptions = wordOptionsArray.map((word) => (
      <li key={word.id} className="sentences__item">
        <ActivityBtnBlank label={word.word} handleClick={this.answerWordClick} />
      </li>
    ));

    return (
      <div className="activity__content sentences">
        <div className="sentences__words">
          <h3 className="sentences__heading">{boardHeading}</h3>
          <p>{sentence}</p>

          <p className="sentences__wrap blanks">{sentenceWithBlanks}</p>

          <ul className="sentences__wrap">{wordOptions}</ul>

          <div className="activity__footer sentences__check">
            <SentenceCheck
              buttonToShow={buttonToShow}
              checkSentence={this.checkSentenceClick}
              continueSentences={this.continueSentencesClick}
              finishSentences={this.finishSentencesClick}
            />
          </div>

          <SentenceSolution isCorrect={isCorrect} answer={answer} />
        </div>
      </div>
    );
  }
}

BlanksBoard.propTypes = {
  lang: PropTypes.string,
  category: PropTypes.string,
  showMessage: PropTypes.func,
};

export default BlanksBoard;
