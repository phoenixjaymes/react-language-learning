import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ActivityHeader = ({ page, heading }) => (
  <header className="activity__header">
    <Link to={`/${page}`} className="btn-activitiy activity__close" ng-click="showWords = false; finalMessage = false">X</Link>
    <h2 className="activity__heading">{heading}</h2>
  </header>
);

ActivityHeader.propTypes = {
  page: PropTypes.string,
  heading: PropTypes.string,
};

export default ActivityHeader;
