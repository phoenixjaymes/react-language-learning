import React from 'react';
import PropTypes from 'prop-types';

const CardFaceBackVerbAf = ({
  cardData, handleFlipClick, handleExamplesToggle, exampleClass, exampleText, id,
}) => {
  let tableVerb;

  if (id === 'perfect') {
    tableVerb = cardData.perfect;
  } else if (id === 'imperfect') {
    tableVerb = cardData.imperfect;
  } else {
    tableVerb = cardData.present;
  }

  return (
    <div className="card__back--verb">
      <h3 className="card__heading">{cardData.translation}</h3>

      <table className="card__table">
        <thead>
          <tr>
            <th>Person</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="card__table-col-one">almal</td>
            <td className="card__table-col-two">{tableVerb}</td>
          </tr>
        </tbody>
      </table>

      <p className="card__example">{cardData.example}</p>

      <div className={`card__verb-examples ${exampleClass}`}>
        <h3 className="card__heading">{cardData.translation}</h3>
        <h4>Present</h4>
        <p className="card__example">{cardData.example}</p>
        <h4>Perfect</h4>
        <p className="card__example">{cardData.exPerfect}</p>
        <h4>Imperfect</h4>
        <p className="card__example">{cardData.exImperfect}</p>
      </div>

      <button
        type="button"
        className="card__txt-examples"
        onClick={handleExamplesToggle}
      >
        {exampleText}
      </button>
      <button
        type="button"
        className="card__txt-flip"
        onClick={handleFlipClick}
      >
        Flip
      </button>
    </div>
  );
};

CardFaceBackVerbAf.propTypes = {
  cardData: PropTypes.shape(),
  handleFlipClick: PropTypes.func,
  handleExamplesToggle: PropTypes.func,
  exampleClass: PropTypes.string,
  exampleText: PropTypes.string,
  id: PropTypes.string,
};

export default CardFaceBackVerbAf;
