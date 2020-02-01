import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CartControls from './CardControls';

class PhraseCard extends Component {
  state = {
    flipClass: '',
    isLoaded: false,
    error: false,
    data: [],
    currentCard: 0,
    totalCards: 0,
    english: '',
    translation: '',
  }

  componentDidMount() {
    const { category, lang } = this.props;

    fetch(`http://phoenixjaymes.com/assets/data/language/get-cards.php?lang=${lang}&pos=${category}`)
      .then(reponse => reponse.json())
      .then((responseData) => {
        this.setState({
          data: responseData.data,
          english: responseData.data[0].english,
          translation: responseData.data[0].translation,
          totalCards: responseData.data.length,
          isLoaded: true,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        this.setState({ error: true, isLoaded: true });
      });
  }

  flipCard = () => {
    const { flipClass } = this.state;
    if (flipClass === 'js-flip-card') {
      this.setState({ flipClass: '' });
    } else {
      this.setState({ flipClass: 'js-flip-card' });
    }
  }

  cardNext = () => {
    const { currentCard, totalCards } = this.state;
    if (currentCard !== totalCards - 1) {
      this.setState((prevState) => {
        const cardNum = prevState.currentCard + 1;
        return {
          currentCard: cardNum,
          english: prevState.data[cardNum].english,
          translation: prevState.data[cardNum].translation,
          gender: prevState.data[cardNum].gender,
          flipClass: '',
        };
      });
    }
  }

  cardBack = () => {
    const { currentCard } = this.state;
    if (currentCard !== 0) {
      this.setState((prevState) => {
        const cardNum = prevState.currentCard - 1;
        return {
          currentCard: cardNum,
          english: prevState.data[cardNum].english,
          translation: prevState.data[cardNum].translation,
          gender: prevState.data[cardNum].gender,
          flipClass: '',
        };
      });
    }
  }

  render() {
    const {
      flipClass, english, translation, currentCard, totalCards,
    } = this.state;
    const newCurrentCard = currentCard + 1;

    return (
      <div className="activity__content--cards">

        <div className={`card ${flipClass}`}>
          <div className="card__front">
            <div className="card__text-wrap">
              <p className="card__text">{english}</p>
            </div>

            <button type="button" className="card__button" onClick={this.flipCard}>Flip</button>
          </div>

          <div className="card__back {{gender}}">
            <div className="card__text-wrap">
              <p className="card__text">{translation}</p>
            </div>

            <button type="button" className="card__button" onClick={this.flipCard}>Flip</button>
          </div>
        </div>

        <CartControls
          currentCard={newCurrentCard}
          totalCards={totalCards}
          cardBack={this.cardBack}
          cardNext={this.cardNext}
        />

      </div>
    );
  }
}

PhraseCard.propTypes = {
  lang: PropTypes.string,
  category: PropTypes.string,
};

export default PhraseCard;
