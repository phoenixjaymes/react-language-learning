import React, { Component } from "react";
import PropTypes from "prop-types";

import withFlipAndToggle from "./withFlipAndToggle";
import CartControls from "./CardControls";
// import Loading from '../Loading';

class GenericCard extends Component {
  state = {
    isLoaded: false,
    error: false,
    data: [],
    currentCard: 0,
    totalCards: 0,
    english: "",
    translation: "",
    example: "",
    image: "",
    gender: "",
  };

  componentDidMount() {
    const { lang, category, activityId } = this.props;

    const genericDeck = (deck) => {
      this.setState({
        data: deck,
        english: deck[0].english,
        translation: deck[0].translation,
        example: deck[0].example,
        image: deck[0].img,
        gender: deck[0].gender,
        totalCards: deck.length,
        isLoaded: true,
      });
    };

    fetch(
      `https://phoenixjaymes.com/assets/data/language/get-cards.php?lang=${lang}&pos=${category}&cat=${activityId}`
    )
      .then((reponse) => reponse.json())
      .then((responseData) => genericDeck(responseData.data))
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
        this.setState({ error: true, isLoaded: true });
      });
  }

  cardNext = () => {
    const { currentCard, totalCards } = this.state;
    const { setFlipClass } = this.props;

    if (currentCard !== totalCards - 1) {
      this.setState((prevState) => {
        const cardNum = prevState.currentCard + 1;
        return {
          currentCard: cardNum,
          english: prevState.data[cardNum].english,
          translation: prevState.data[cardNum].translation,
          example: prevState.data[cardNum].example,
          image: prevState.data[cardNum].img,
          gender: prevState.data[cardNum].gender,
        };
      });
    }

    setFlipClass();
  };

  cardBack = () => {
    const { currentCard } = this.state;
    if (currentCard !== 0) {
      this.setState((prevState) => {
        const cardNum = prevState.currentCard - 1;
        return {
          currentCard: cardNum,
          english: prevState.data[cardNum].english,
          translation: prevState.data[cardNum].translation,
          example: prevState.data[cardNum].example,
          image: prevState.data[cardNum].img,
          gender: prevState.data[cardNum].gender,
          flipClass: "",
        };
      });
    }
  };

  render() {
    const {
      english,
      translation,
      gender,
      example,
      image,
      currentCard,
      totalCards,
    } = this.state;
    const { flipCard, flipClass } = this.props;
    const newCurrentCard = currentCard + 1;

    console.log(image);

    return (
      <div className="activity__content--cards">
        <div className={`card ${flipClass}`}>
          {/* <!-- Front with no image --> */}
          <div className="card__front" ng-switch-when="none">
            <div className="card__text-wrap">
              <p className="card__text">{english}</p>
            </div>

            <button type="button" className="card__button" onClick={flipCard}>
              Flip
            </button>
          </div>

          {/* <!-- Back with no image --> */}
          <div className={`card__back ${gender}`} ng-switch-when="none">
            <div className="card__text-wrap">
              <p className="card__text">{translation}</p>
            </div>

            <p className="card__example">{example}</p>

            <button type="button" className="card__button" onClick={flipCard}>
              Flip
            </button>
          </div>
        </div>

        <CartControls
          currentCard={newCurrentCard}
          totalCards={totalCards}
          cardBack={this.cardBack}
          cardNext={this.cardNext}
        />

        {/* <Loading /> */}
      </div>
    );
  }
}

GenericCard.propTypes = {
  lang: PropTypes.string,
  category: PropTypes.string,
  activityId: PropTypes.string,
  flipClass: PropTypes.string.isRequired,
  setFlipClass: PropTypes.func.isRequired,
  flipCard: PropTypes.func.isRequired,
};

export default withFlipAndToggle(GenericCard);
