import React from 'react';
import PropTypes from 'prop-types';

const DefinitionList = ({ definitions }) => {
  const listItems = definitions.map(item => (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description1}</dd>
      <dd className="grammar__dl-example">{item.description2}</dd>
    </>
  ));

  return (
    <dl className="grammar__dl">
      {listItems}
    </dl>
  );
};

DefinitionList.propTypes = {
  definitions: PropTypes.shape({
    term: PropTypes.string,
    description1: PropTypes.string,
    description2: PropTypes.string,
  }),
}

export default DefinitionList;
