import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WordBoardButton from './WordBoardButton';

import styles from "./wordBoard.module.css";

class WordBoard extends Component {
  state = {
    isLoaded: false,
    error: false,

    words: [],
    firstClickedId: undefined,
    firstClickedMatchId: undefined,
  }

  componentDidMount() {
    const { category, lang } = this.props;
    const wordList = (list) => {
      this.setState({
        words: list,
        isLoaded: true,
      });
    };

    fetch(`http://phoenixjaymes.com/assets/data/language/get-words.php?lang=${lang}&pos=${category}`)
      .then((reponse) => reponse.json())
      .then((responseData) => wordList(responseData.data))
      .catch((error) => {
        this.setState({ isLoaded: true, error: true });
        console.log('Error fetching and parsing data', error);
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
  }

  checkForMatch = (id, matchId) => {
    const { words, firstClickedMatchId } = this.state;

    if (matchId === firstClickedMatchId) {
 
      this.setState(prevState => ({
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
    } else {  console.log('wrong click');
      this.setState(prevState => ({
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
  }

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
  }

  render() {
    const { words } = this.state;
    const listOfWords = words.map((word, index) => (
      <li className={styles.wordsItem} key={index}>
        <WordBoardButton word={word} handleWordClick={this.handleWordClick} />
      </li>
    ));

    return (
      <div className={styles.words}>
        <ul className={styles.wordsWrap}>
          {listOfWords}
        </ul>
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
