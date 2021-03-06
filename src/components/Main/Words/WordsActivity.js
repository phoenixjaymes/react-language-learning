import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LearningContext } from '../../Context';

import ActivityWrap from '../ActivityComponents/ActivityWrap';
import ActivityHeader from '../ActivityComponents/ActivityHeader';
import WordBoardButton from './WordBoardButton';
import FinalMessage from '../FinalMessage';

import './words.css';

import styles from './wordsActivity.module.css';

const WordsActivity = ({ match }) => {
  const { lang } = useContext(LearningContext);
  const [isFinalMessageVisible, setIsFinalMessageVisible] = useState(false);
  const { category } = match.params;
  const wordsCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [words, setWords] = useState([]);
  const [firstClickedId, setFirstClickedId] = useState(undefined);
  const [firstClickedMatchId, setFirstClickedMatchId] = useState(undefined);

  useEffect(() => {
    const wordList = (list) => {
      setWords(list);
      setIsLoading(false);
    };

    fetch(
      `https://phoenixjaymes.com/api/language/words?lang=${lang}&pos=${category}`
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        wordList(responseData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setFetchError(true);
        console.log('Error fetching and parsing data', error);
      });
  }, [category, lang]);

  const toggleClicked = (idToToggle, id, matchId) => {
    // const { words } = this.state;

    setFirstClickedId(id);
    setFirstClickedMatchId(matchId);

    const tempWords = words.map((word) => {
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
    });

    setWords(tempWords);

    // setState({
    //   firstClickedId: id,
    //   firstClickedMatchId: matchId,
    //   words: words.map((word) => {
    //     if (idToToggle === word.id) {
    //       return {
    //         ...word,
    //         isClicked: !word.isClicked,
    //         isClickCorrect: true,
    //       };
    //     }
    //     return {
    //       ...word,
    //       isClickCorrect: true,
    //     };
    //   }),
    // });
  };

  const isFinalMatch = () => {
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

  const checkForMatch = (id, matchId) => {
    if (matchId === firstClickedMatchId) {

      setFirstClickedId(undefined);
      setFirstClickedMatchId(undefined);

      const tempWords = words.map((word) => {
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
      });

      setWords(tempWords);

      // this.setState((prevState) => ({

      //   firstClickedId: undefined,
      //   firstClickedMatchId: undefined,
      //   words: words.map((word) => {
      //     if (matchId === word.matchId) {
      //       return {
      //         ...word,
      //         isClicked: false,
      //         isMatched: true,
      //         isClickCorrect: true,
      //       };
      //     }
      //     return {
      //       ...word,
      //       isClickCorrect: true,
      //     };
      //   }),
      // }));

      if (isFinalMatch()) {
        setIsFinalMessageVisible(true);
      }
    } else {
      const tempWords = words.map((word) => {
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
      });

      setWords(tempWords);

      // this.setState((prevState) => ({
      //   words: words.map((word) => {
      //     if (id === word.id) {
      //       return {
      //         ...word,
      //         isClickCorrect: false,
      //       };
      //     }
      //     return {
      //       ...word,
      //       isClickCorrect: true,
      //     };
      //   }),
      // }));
    }
  };

  const handleWordClick = (obj) => {
    const { id, matchId } = obj;

    if (!obj.isMatched) {
      if (firstClickedId === undefined) {
        toggleClicked(id, id, matchId);
      } else if (firstClickedId === id) {
        toggleClicked(id, undefined, undefined);
      } else if (firstClickedId !== id) {
        checkForMatch(id, matchId);
      }
    }
  };

  const listOfWords = words.map((word, index) => (
    <li className={styles.wordsItem} key={index}>
      <WordBoardButton word={word} handleWordClick={handleWordClick} />
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
        heading={`Match the ${wordsCategory}`}
        page="words"
      />

      <div className={styles.wrap}>
        <div className={styles.words}>
          <ul className={styles.wordsWrap}>{listOfWords}</ul>
        </div>
      </div>

      <div>&nbsp;-</div>

      {isFinalMessageVisible && (
        <FinalMessage
          type="words"
          lang={lang}
        />
      )}
    </ActivityWrap>
  );
};

WordsActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default WordsActivity;
