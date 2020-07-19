import React from 'react';
import PropTypes from 'prop-types';

const CardFaceBackVerbNl = ({
  cardData, handleFlipClick, handleExamplesToggle, exampleClass, exampleText, id,
}) => {
  let tableVerb;

  if (id === 'perfect') {
    if (!cardData.perfect) {
      tableVerb = cardData.perfect;
    } else {
      tableVerb = '-';
    }
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
          {id !== 'perfect' && (
            <>
              <tr>
                <td className="card__table-col-one">ik</td>
                <td className="card__table-col-two">{tableVerb.ik}</td>
              </tr>
              <tr>
                <td className="card__table-col-one">jij</td>
                <td className="card__table-col-two">{tableVerb.jij}</td>
              </tr>
              <tr>
                <td className="card__table-col-one">hij</td>
                <td className="card__table-col-two">{tableVerb.hij}</td>
              </tr>
              <tr>
                <td className="card__table-col-one">u</td>
                <td className="card__table-col-two">{tableVerb.u}</td>
              </tr>
              <tr>
                <td className="card__table-col-one">wij</td>
                <td className="card__table-col-two">{tableVerb.wij}</td>
              </tr>
              <tr>
                <td className="card__table-col-one">jullie</td>
                <td className="card__table-col-two">{tableVerb.jullie}</td>
              </tr>
              <tr>
                <td className="card__table-col-one">zij</td>
                <td className="card__table-col-two">{tableVerb.zij}</td>
              </tr>
            </>
          )}
          {id === 'perfect' && (
            <>
              <tr>
                <td className="card__table-col-one">ich</td>
                <td className="card__table-col-two">{tableVerb}</td>
              </tr>
            </>
          )}
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

CardFaceBackVerbNl.propTypes = {
  cardData: PropTypes.shape(),
  handleFlipClick: PropTypes.func,
  handleExamplesToggle: PropTypes.func,
  exampleClass: PropTypes.string,
  exampleText: PropTypes.string,
  id: PropTypes.string,
};

export default CardFaceBackVerbNl;
