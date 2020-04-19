import React, { Component } from "react";
import PropTypes from "prop-types";

import SentenceSolution from "../Sentences/SentenceSolution";
import SentenceCheck from "../Sentences/SentenceCheck";

class BlanksBoard extends Component {
  state = {
    isLoaded: false,
    error: false,

    buttonToShow: undefined,
    isCorrect: undefined,

    boardHeading: "",

    currentSentence: 0,
    totalSentences: 0,
    blanks: [],
    sentence: "",
    answer: "",
    sentenceArray: [],
    answerArray: [],
    blankIndex: "",
    wordOptionsArray: [],
  };

  componentDidMount() {
    const { lang, category } = this.props;

    fetch(
      `https://phoenixjaymes.com/assets/data/language/get-blanks.php?lang=${lang}&cat=${category}`
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        this.setState({
          blanks: responseData.data,
          sentenceArray: responseData.data[0].sentence.split(" "),
          answerArray: responseData.data[0].answer.split(" "),
          blankIndex: responseData.data[0].sentence.split(" ").indexOf("_"),
          wordOptionsArray: responseData.data[0].words,
          totalSentences: responseData.data.length,
          isLoaded: true,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  answerWordClick = (word) => {
    const { blankIndex, buttonToShow } = this.state;

    if (buttonToShow === "continue") {
      return;
    }

    this.setState((prevState) => {
      const oldArray = prevState.sentenceArray;
      oldArray.splice(blankIndex, 1, word);

      return {
        sentenceArray: oldArray,
        buttonToShow: "check",
      };
    });
  };

  checkSentenceClick = () => {
    const { sentenceArray, answerArray } = this.state;

    if (sentenceArray.join(" ") === answerArray.join(" ")) {
      this.setState({ isCorrect: true, buttonToShow: "continue" });
    } else {
      this.setState({ isCorrect: false, buttonToShow: "continue" });
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
          sentenceArray: blanks[sentenceNum].sentence.split(" "),
          blankIndex: blanks[sentenceNum].sentence.split(" ").indexOf("_"),
          answerArray: blanks[sentenceNum].answer.split(" "),
          wordOptionsArray: blanks[sentenceNum].words,
        };
      });
    } else {
      this.setState({
        buttonToShow: "finish",
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
      if (word === "_") {
        return (
          <span key={i} className="sentences__word blank">
            {" "}
            &nbsp;{" "}
          </span>
        );
      }

      if (i === blankIndex) {
        return (
          <span key={i} className="sentences__word underline">
            {word}{" "}
          </span>
        );
      }

      return (
        <span key={i} className="sentences__word">
          {word}{" "}
        </span>
      );
    });

    const wordOptions = wordOptionsArray.map((word) => (
      <li key={word.id} className="sentences__item">
        <button type="button" onClick={() => this.answerWordClick(word.word)}>
          {word.word}
        </button>
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
  activityId: PropTypes.string,
  showMessage: PropTypes.func,
};

export default BlanksBoard;
