import React from 'react';
import PropTypes from 'prop-types';

const SearchConjugation = ({ data }) => {
  const getRows = () => {
    const keys = Object.keys(data);

    const rows = keys.map((key, index) => (
      <tr key={key}>
        <td>{keys[index]}</td>
        <td>{data[key]}</td>
      </tr>
    ));

    return rows;
  };

  const rows = getRows();

  return (
    <div>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

SearchConjugation.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
};

export default SearchConjugation;
