import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ dataType, data }) => {
  let i = 0;
  const rows = data.map((row) => {
    i += 1;
    const cells = row.map((cell) => {
      if (cell.type === 'th') {
        return <th key={cell.id}>{cell.val}</th>;
      }

      return <td key={cell.id}>{cell.val}</td>;
    });
    return <tr key={`row${i}`}>{cells}</tr>;
  });

  return (
    <table className={dataType}>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  dataType: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
};

export default DataTable;
