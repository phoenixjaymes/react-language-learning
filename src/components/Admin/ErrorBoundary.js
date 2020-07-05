import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {

  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h2>Oh no Mr Bill! Something went wrong</h2>;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};
