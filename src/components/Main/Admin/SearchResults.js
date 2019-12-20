import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SearchConjugation from './SearchConjugation';

const SearchResults = ({ data, sortTable }) => {
  const [searchHeader, setSearchHeader] = useState();
  const [searchRows, setSearchRows] = useState();

  const getHead = (keys) => {
    const headers = keys.map((header) => {
      if (header === 'conjugation') {
        return <th key={header}>{header}</th>;
      }

      return <th key={header} data-id={header} onClick={sortTable}>{header}</th>;
    });

    setSearchHeader(<tr>{headers}</tr>);
  };

  const getRows = (keys) => {
    const rows = data.map((row) => {
      const cells = keys.map((cell) => {
        if (cell === 'conjugation') {
          return (
            <td key="conjugation" className="search-conjugation">
              View
              <SearchConjugation data={row[cell]} />
            </td>
          );
        }

        return (
          <td key={cell}>{row[cell]}</td>
        );
      });

      return (
        <tr key={row.id}>
          {cells}
        </tr>
      );
    });

    setSearchRows(rows);
  };

  useEffect(() => {
    if (data[0] !== undefined) {
      const keys = Object.keys(data[0]);
      getHead(keys);
      getRows(keys);
    }
  });

  return (
    <table className="search-results">
      <tbody>
        {searchHeader}
        {searchRows}
      </tbody>
    </table>
  );
};

SearchResults.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  sortTable: PropTypes.func,
};

export default SearchResults;
