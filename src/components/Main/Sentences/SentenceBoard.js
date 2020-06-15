import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SentenceSolution from './SentenceSolution';
import SentenceCheck from './SentenceCheck';

class SentenceBoard extends Component {
  state = {
    isLoaded: false,
    error: false,
    canCheck: false,
    buttonToShow: undefined,
    isCorrect: undefined,

    boardHeading: '',
    sentences: [],
    currentSentence: 0,
    totalSentences: 0,
    sentence: '',
    type: '',
    category: '',
    answer: '',
    words: [],

    sentenceWordsArray: [],
    answerWordsArray: [],
  };

  componentDidMount() {
    const { lang, category, activityId } = this.props;
    let fetchUrl;

    const sentenceList = (list) => {
      let newHeading;

      if (list[0].type === "1") {
        newHeading = "Create the Sentence";
      } else if (list[0].type === "2") {
        newHeading = "Create the Question";
      } else if (list[0].type === "3") {
        newHeading = "Answer the Question";
      } else {
        newHeading = "Make something sensible";
      }

      this.setState({
        sentences: list,
        isLoaded: true,

        totalSentences: list.length,
        boardHeading: newHeading,
        sentence: list[0].sentence,
        type: list[0].type,
        category: list[0].category,
        answer: list[0].answer1,
        words: list[0].words,
        answerWordsArray: list[0].words,

        // Extra words
        // answerWordsArray: list[0].answer1.split(' ').concat(list[0].words)
      });
    };

    if (category === 'type') {
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}&type=${activityId}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}&cat=${activityId}`;
    }

    fetch(fetchUrl)
      .then((reponse) => reponse.json())
      .then((responseData) => sentenceList(responseData.data))
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  sentenceWordClick = (i) => {
    const { buttonToShow } = this.state;

    if (buttonToShow === 'continue' || buttonToShow === 'finish') {
      return;
    }

    this.setState((prevState) => {
      const oldArray = prevState.sentenceWordsArray;
      const removedWord = oldArray.splice(i, 1);
      prevState.answerWordsArray.push(removedWord);

      return {
        sentenceWordsArray: oldArray,
      };
    });
  };

  answerWordClick = (i) => {
    const { buttonToShow } = this.state;

    if (buttonToShow === 'continue' || buttonToShow === 'finish') {
      return;
    }

    this.setState((prevState) => {
      const oldArray = prevState.answerWordsArray;
      const removedWord = oldArray.splice(i, 1).toString();
      prevState.sentenceWordsArray.push(removedWord);

      return {
        answerWordsArray: oldArray,
        buttonToShow: 'check',
        canCheck: true,
      };
    });
  };

  checkSentenceClick = () => {
    const { answer, sentenceWordsArray } = this.state;
    if (answer === sentenceWordsArray.join(' ')) {
      this.setState({ isCorrect: true, buttonToShow: 'continue' });
    } else {
      this.setState({ isCorrect: false, buttonToShow: 'continue' });
    }
  };

  continueSentencesClick = () => {
    const { currentSentence, totalSentences } = this.state;
    if (currentSentence < totalSentences - 1) {
      this.setState((prevState) => {
        const sentenceNum = prevState.currentSentence + 1;
        let newHeading;

        if (prevState.sentences[sentenceNum].type === '1') {
          newHeading = 'Create the Sentence';
        } else if (prevState.sentences[sentenceNum].type === '2') {
          newHeading = 'Create the Question';
        } else if (prevState.sentences[sentenceNum].type === '3') {
          newHeading = 'Answer the Question';
        } else {
          newHeading = 'Make something sensible';
        }

        return {
          buttonToShow: undefined,
          currentSentence: sentenceNum,
          sentenceWordsArray: [],
          isCorrect: undefined,

          boardHeading: newHeading,
          sentence: prevState.sentences[sentenceNum].sentence,
          type: prevState.sentences[sentenceNum].type,
          category: prevState.sentences[sentenceNum].category,
          answer: prevState.sentences[sentenceNum].answer1,
          words: prevState.sentences[sentenceNum].words,
          answerWordsArray: prevState.sentences[sentenceNum].words,
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
      sentenceWordsArray,
      answerWordsArray,
      buttonToShow,
      boardHeading,
      sentence,
      isCorrect,
      answer,
    } = this.state;
    const sentenceWords = sentenceWordsArray.map((word, i) => (
      <li key={i} className="sentences__item">
        <button type="button" onClick={this.sentenceWordClick.bind(this, i)}>
          {word}
        </button>
      </li>
    ));

    const answerWords = answerWordsArray.map((word, i) => (
      <li key={i} className="sentences__item">
        <button type="button" onClick={this.answerWordClick.bind(this, i)}>
          {word}
        </button>
      </li>
    ));

    return (
      <div className="activity__content sentences">
        <div className="sentences__words">
          <h3 className="sentences__heading">{boardHeading}</h3>
          <p className="sentences__sentence">{sentence}</p>

          <ul className="sentences__wrap">{sentenceWords}</ul>

          <ul className="sentences__wrap">{answerWords}</ul>

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

SentenceBoard.propTypes = {
  lang: PropTypes.string,
  category: PropTypes.string,
  activityId: PropTypes.string,
  showMessage: PropTypes.func,
};

export default SentenceBoard;
