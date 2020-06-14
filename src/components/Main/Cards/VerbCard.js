import React, { Component } from "react";
import PropTypes from "prop-types";

import CartControls from "./CardControls";

class VerbCard extends Component {
  state = {
    flipClass: "",
    exampleClass: "",
    exampleClassText: "Examples",
    isLoaded: false,
    error: false,
    data: [],
    currentCard: 0,
    totalCards: 0,
    english: "",
    translation: "",
    ich: "",
    du: "",
    er: "",
    wir: "",
    ihr: "",
    Sie: "",
    image: "",
    gender: "",
    example: "",
    exPerfect: "",
    exImperfect: "",
  };

  componentDidMount() {
    const { lang, activityId } = this.props;
    const tenses = ['present', 'perfect', 'imperfect'];
    let fetchUrl;

    if (tenses.includes(activityId)) {
      fetchUrl = `https://phoenixjaymes.com/api/language/verbcards?lang=${lang}&tense=${activityId}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/verbcards?lang=${lang}&${activityId}=yes`;
    }

    fetch(fetchUrl)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        this.setState({
          data: responseData.data,
          english: responseData.data[0].english,
          translation: responseData.data[0].translation,
          ich: responseData.data[0].ich,
          du: responseData.data[0].du,
          er: responseData.data[0].er_sie_es,
          wir: responseData.data[0].wir,
          ihr: responseData.data[0].ihr,
          Sie: responseData.data[0].sie_Sie,
          image: responseData.data[0].img,
          gender: responseData.data[0].gender,
          example: responseData.data[0].example,
          exPerfect: responseData.data[0].ex_perfect,
          exImperfect: responseData.data[0].ex_imperfect,
          totalCards: responseData.data.length,
          isLoaded: true,
        });
      })
      .catch((error) => {
        console.log("Error fetching anaad parsing data", error);
        this.setState({ error: true, isLoaded: true });
      });
  }

  flipCard = () => {
    const { flipClass } = this.state;
    if (flipClass === "js-flip-card") {
      this.setState({ flipClass: "" });
    } else {
      this.setState({ flipClass: "js-flip-card" });
    }
  };

  cardNext = () => {
    const { currentCard, totalCards } = this.state;
    if (currentCard !== totalCards - 1) {
      this.setState((prevState) => {
        const cardNum = prevState.currentCard + 1;
        return {
          currentCard: cardNum,
          english: prevState.data[cardNum].english,
          translation: prevState.data[cardNum].translation,
          ich: prevState.data[cardNum].ich,
          du: prevState.data[cardNum].du,
          er: prevState.data[cardNum].er_sie_es,
          wir: prevState.data[cardNum].wir,
          ihr: prevState.data[cardNum].ihr,
          Sie: prevState.data[cardNum].sie_Sie,
          image: prevState.data[cardNum].img,
          gender: prevState.data[cardNum].gender,
          example: prevState.data[cardNum].example,
          exPerfect: prevState.data[cardNum].ex_perfect,
          exImperfect: prevState.data[cardNum].ex_imperfect,
          flipClass: "",
          exampleClass: "",
          exampleClassText: "Examples",
        };
      });
    }
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
          ich: prevState.data[cardNum].ich,
          du: prevState.data[cardNum].du,
          er: prevState.data[cardNum].er_sie_es,
          wir: prevState.data[cardNum].wir,
          ihr: prevState.data[cardNum].ihr,
          Sie: prevState.data[cardNum].sie_Sie,
          image: prevState.data[cardNum].img,
          gender: prevState.data[cardNum].gender,
          example: prevState.data[cardNum].example,
          exPerfect: prevState.data[cardNum].ex_perfect,
          exImperfect: prevState.data[cardNum].ex_imperfect,
          flipClass: "",
          exampleClass: "",
          exampleClassText: "Examples",
        };
      });
    }
  };

  toggleExamples = () => {
    const { exampleClass } = this.state;
    if (exampleClass === "") {
      this.setState({
        exampleClass: "showExamples",
        exampleClassText: "Conjugation",
      });
    } else {
      this.setState({ exampleClass: "", exampleClassText: "Examples" });
    }
  };

  render() {
    const {
      flipClass,
      english,
      translation,
      example,
      exPerfect,
      exImperfect,
      exampleClass,
      exampleClassText,
      ich,
      du,
      er,
      wir,
      ihr,
      Sie,
      currentCard,
      totalCards,
    } = this.state;
    const newCurrentCard = currentCard + 1;
    return (
      <div className="activity__content--cards">
        <div className={`card ${flipClass}`}>
          {/* <!-- Front with no image --> */}
          <div className="card__front" ng-switch-when="none">
            <div className="card__text-wrap">
              <p className="card__text">{english}</p>
            </div>

            <button
              type="button"
              className="card__button"
              onClick={this.flipCard}
            >
              Flip
            </button>
          </div>

          {/* <!-- Back with no image --> */}
          <div className="card__back--verb">
            <h3 className="card__heading">{translation}</h3>

            <table className="card__table">
              <thead>
                <tr>
                  <th>Person</th>
                  <th>Present</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="card__table-col-one">ich</td>
                  <td className="card__table-col-two">{ich}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">du</td>
                  <td className="card__table-col-two">{du}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">er</td>
                  <td className="card__table-col-two">{er}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">wir</td>
                  <td className="card__table-col-two">{wir}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">ihr</td>
                  <td className="card__table-col-two">{ihr}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">Sie</td>
                  <td className="card__table-col-two">{Sie}</td>
                </tr>
              </tbody>
            </table>

            <p className="card__example">{example}</p>

            <div className={`card__verb-examples ${exampleClass}`}>
              <h3 className="card__heading">{this.translation}</h3>
              <h4>Present</h4>
              <p className="card__example">{example}</p>
              <h4>Perfect</h4>
              <p className="card__example">{exPerfect}</p>
              <h4>Imperfect</h4>
              <p className="card__example">{exImperfect}</p>
            </div>

            <button
              type="button"
              className="card__txt-examples"
              onClick={this.toggleExamples}
            >
              {exampleClassText}
            </button>
            <button
              type="button"
              className="card__txt-flip"
              onClick={this.flipCard}
            >
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
      </div>
    );
  }
}

VerbCard.propTypes = {
  lang: PropTypes.string,
  activityId: PropTypes.string,
};

export default VerbCard;
