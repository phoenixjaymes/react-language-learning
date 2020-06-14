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
    ik: "",
    jij: "",
    hij: "",
    u: "",
    wij: "",
    jullie: "",
    zij: "",
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
          ik: responseData.data[0].ik,
          jij: responseData.data[0].jij,
          hij: responseData.data[0].hij,
          u: responseData.data[0].u,
          wij: responseData.data[0].wij,
          jullie: responseData.data[0].jullie,
          zij: responseData.data[0].zij,
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
          ik: prevState.data[cardNum].ik,
          jij: prevState.data[cardNum].jij,
          hij: prevState.data[cardNum].hij,
          u: prevState.data[cardNum].u,
          wij: prevState.data[cardNum].wij,
          jullie: prevState.data[cardNum].jullie,
          zij: prevState.data[cardNum].zij,
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
          ik: prevState.data[cardNum].ik,
          jij: prevState.data[cardNum].jij,
          hij: prevState.data[cardNum].hij,
          u: prevState.data[cardNum].u,
          wij: prevState.data[cardNum].wij,
          jullie: prevState.data[cardNum].jullie,
          zij: prevState.data[cardNum].zij,
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
      ik,
      jij,
      hij,
      u,
      wij,
      jullie,
      zij,
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
                  <td className="card__table-col-one">ik</td>
                  <td className="card__table-col-two">{ik}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">jij</td>
                  <td className="card__table-col-two">{jij}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">hij</td>
                  <td className="card__table-col-two">{hij}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">u</td>
                  <td className="card__table-col-two">{u}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">wij</td>
                  <td className="card__table-col-two">{wij}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">jullie</td>
                  <td className="card__table-col-two">{jullie}</td>
                </tr>
                <tr>
                  <td className="card__table-col-one">zij</td>
                  <td className="card__table-col-two">{zij}</td>
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
