import React from 'react';
import PropTypes from 'prop-types';

const TableWrap = ({ children }) => (
  <div className="grammar__table-wrap">
    {children}
  </div>
);

TableWrap.propTypes = {
  children: PropTypes.node,
};

export default TableWrap;
