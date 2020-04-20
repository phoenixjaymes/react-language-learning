import React, { Component } from "react";
import PropTypes from "prop-types";

import WordBoardButton from "./WordBoardButton";

import styles from "./wordBoard.module.css";

class WordBoard extends Component {
  state = {
    isLoaded: false,
    error: false,

    words: [],
    firstClickedId: undefined,
    firstClickedMatchId: undefined,
  };

  componentDidMount() {
    const { category, lang } = this.props;
    const wordList = (list) => {
      this.setState({
        words: list,
        isLoaded: true,
      });
    };

    fetch(
      `https://phoenixjaymes.com/assets/data/language/get-words.php?lang=${lang}&pos=${category}`
    )
      .then((reponse) => reponse.json())
      .then((responseData) => wordList(responseData.data))
      .catch((error) => {
        this.setState({ isLoaded: true, error: true });
        console.log("Error fetching and parsing data", error);
      });
  }

  toggleClicked = (idToToggle, id, matchId) => {
    const { words } = this.state;
    this.setState({
      firstClickedId: id,
      firstClickedMatchId: matchId,
      words: words.map((word) => {
        if (idToToggle === word.id) {
          return {
            ...word,
            isClicked: !word.isClicked,
            isClickCorrect: true,
          };
        }
        return {
          ...word,
          isClickCorrect: true,
        };
      }),
    });
  };

  isFinalMatch = () => {
    const { words } = this.state;
    const wordsCnt = words.length;
    let matchedCnt = 2;

    words.forEach((word) => {
      if (word.isMatched === true) {
        matchedCnt += 1;
      }
    });

    if (matchedCnt >= wordsCnt) {
      return true;
    }

    return false;
  };

  checkForMatch = (id, matchId) => {
    const { showMessage } = this.props;
    const { words, firstClickedMatchId } = this.state;

    if (matchId === firstClickedMatchId) {
      this.setState((prevState) => ({
        firstClickedId: undefined,
        firstClickedMatchId: undefined,
        words: words.map((word) => {
          if (matchId === word.matchId) {
            return {
              ...word,
              isClicked: false,
              isMatched: true,
              isClickCorrect: true,
            };
          }
          return {
            ...word,
            isClickCorrect: true,
          };
        }),
      }));

      if (this.isFinalMatch()) {
        showMessage(true);
      }
    } else {
      this.setState((prevState) => ({
        words: words.map((word) => {
          if (id === word.id) {
            return {
              ...word,
              isClickCorrect: false,
            };
          }
          return {
            ...word,
            isClickCorrect: true,
          };
        }),
      }));
    }
  };

  handleWordClick = (obj) => {
    const { firstClickedId } = this.state;
    const { id, matchId } = obj;

    if (!obj.isMatched) {
      if (firstClickedId === undefined) {
        this.toggleClicked(id, id, matchId);
      } else if (firstClickedId === id) {
        this.toggleClicked(id, undefined, undefined);
      } else if (firstClickedId !== id) {
        this.checkForMatch(id, matchId);
      }
    }
  };

  render() {
    const { words } = this.state;
    const listOfWords = words.map((word, index) => (
      <li className={styles.wordsItem} key={index}>
        <WordBoardButton word={word} handleWordClick={this.handleWordClick} />
      </li>
    ));

    return (
      <div className={styles.words}>
        <ul className={styles.wordsWrap}>{listOfWords}</ul>
      </div>
    );
  }
}

WordBoard.propTypes = {
  category: PropTypes.string,
  lang: PropTypes.string,
  showMessage: PropTypes.func,
};

export default WordBoard;
