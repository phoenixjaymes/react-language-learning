import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import SearchConjugation from './SearchConjugation';

const SearchResults = ({ data }) => {
  const [searchHeader, setSearchHeader] = useState();
  const [searchRows, setSearchRows] = useState();
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const sortAscMemoizedCallback = useCallback((a, b, dataId) => {
    const nameA = a[dataId].toUpperCase(); // ignore upper and lowercase
    const nameB = b[dataId].toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }, []);

  const sortDscMemoizedCallback = useCallback((a, b, dataId) => {
    const nameA = a[dataId].toUpperCase(); // ignore upper and lowercase
    const nameB = b[dataId].toUpperCase(); // ignore upper and lowercase

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }, []);

  const sortIdMemoizedCallback = useCallback(() => {
    if (sortColumn !== 'id') {
      setSortColumn('id');
      setSortDirection('asc');
      data.sort((a, b) => a.id - b.id);
    } else if (sortColumn === 'id' && sortDirection === 'asc') {
      setSortDirection('dsc');
      data.sort((a, b) => b.id - a.id);
    } else if (sortColumn === 'id' && sortDirection === 'dsc') {
      setSortDirection('asc');
      data.sort((a, b) => a.id - b.id);
    }
  }, [data, sortColumn, sortDirection]);

  const sortColumnsMemoizedCallback = useCallback((dataId) => {
    if (sortColumn !== dataId) {
      setSortColumn(dataId);
      setSortDirection('asc');
      data.sort((a, b) => sortAscMemoizedCallback(a, b, dataId));
    } else if (sortColumn === dataId && sortDirection === 'asc') {
      setSortDirection('dsc');
      data.sort((a, b) => sortDscMemoizedCallback(a, b, dataId));
    } else if (sortColumn === dataId && sortDirection === 'dsc') {
      setSortDirection('asc');
      data.sort((a, b) => sortAscMemoizedCallback(a, b, dataId));
    }
  }, [data, sortColumn, sortDirection, sortAscMemoizedCallback, sortDscMemoizedCallback]);

  const sortTableMemoizedCallback = useCallback((e) => {
    const dataId = e.target.getAttribute('data-id');

    if (dataId === 'id') {
      sortIdMemoizedCallback();
    } else {
      sortColumnsMemoizedCallback(dataId);
    }
  }, [sortIdMemoizedCallback, sortColumnsMemoizedCallback]);

  const headMemoizedCallback = useCallback(() => {
    const keys = Object.keys(data[0]);

    const headers = keys.map((header) => {
      if (header === 'conjugation') {
        return <th key={header}>{header}</th>;
      }

      return <th key={header} data-id={header} onClick={sortTableMemoizedCallback}>{header}</th>;
    });

    setSearchHeader(<tr>{headers}</tr>);
  }, [data, sortTableMemoizedCallback]);

  const rowsMemoizedCallback = useCallback(() => {
    const keys = Object.keys(data[0]);

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
  }, [data]);

  useEffect(() => {
    if (data[0] !== undefined) {
      headMemoizedCallback();
      rowsMemoizedCallback();
    }
  }, [data, headMemoizedCallback, rowsMemoizedCallback]);

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
};

export default SearchResults;
