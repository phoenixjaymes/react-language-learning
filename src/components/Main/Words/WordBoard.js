import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WordBoard extends Component {
  state = {
    clickClass: '',
    eleFirstClick: undefined,
    isLoaded: false,
    error: false,

    words: [],
    wordOneId: undefined,
    wordOneIndex: undefined,
    wordTwoId: undefined,
    wordTwoIndex: undefined,
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

  wordClick = (index, id, e) => {
    const {
      wordOneId, wordOneIndex, wordTwoId, eleFirstClick,
    } = this.state;
    if (wordOneId === undefined) {
      const eleClciked = e.target.parentElement;
      eleClciked.classList.add('on');
      this.setState({
        wordOneId: id,
        wordOneIndex: index,
        eleFirstClick: eleClciked,
      });
      // return;
    } else if (wordOneIndex === index && wordTwoId === undefined) {
      e.target.parentElement.classList.remove('on');

      this.setState({
        wordOneId: undefined,
        wordOneIndex: undefined,
      });
    } else if ((wordOneId !== undefined) && (wordTwoId === undefined)) {
      this.setState({
        wordTwoId: id,
        wordTwoIndex: index,
      });

      this.checkForMatch(id, index, eleFirstClick);
    }
  }

  checkForMatch = (wTwoId, wTwoIndex, eleFirstClick) => {
    const { wordOneId, wordOneIndex, words } = this.state;
    const { showMessage } = this.props;

    // Word match
    if ((wordOneId === wTwoId) && (wordOneIndex !== wTwoIndex)) {

      if (words.length === 2) {
        showMessage(true);
      }

      eleFirstClick.classList.remove('on');

      if (wordOneIndex > wTwoIndex) {
        this.setState((prevState) => {
          const oldArray = prevState.words;
          oldArray.splice(prevState.wordOneIndex, 1);
          oldArray.splice(wTwoIndex, 1);
          return {
            words: oldArray,
          };
        });
      } else {
        this.setState((prevState) => {
          const oldArray = prevState.words;
          oldArray.splice(wTwoIndex, 1);
          oldArray.splice(prevState.wordOneIndex, 1);
          return {
            words: oldArray,
          };
        });
      }

      this.setState({
        wordOneId: undefined,
        wordOneIndex: undefined,
        wordTwoId: undefined,
        wordTwoIndex: undefined,
      });
    } else {
      this.setState({
        wordTwoId: undefined,
        wordTwoIndex: undefined,
      });
    }
  }

  render() {
    const { words } = this.state;
    const listOfWords = words.map((word, index) => (
      <li className="words__item" key={index}>
        <button type="button" onClick={this.wordClick.bind(this, index, word.id)}>{word.word}</button>
      </li>
    ));

    return (
      <div className="words">
        <ul className="words__wrap">
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
