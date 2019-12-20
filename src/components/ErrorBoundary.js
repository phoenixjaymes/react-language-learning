import React, { Component } from 'react';
import PropTypes from 'prop-types';

import imgDe from './home-img-de.svg';

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
      return (
        <main>
          <section className="home">
            <h1 className="home__title">Language Learning</h1>
            <img className="home__image" src={imgDe} alt="flashcard logo" />
            <p style={{ textAlign: 'center' }}>Looks like there was an error. We&apos;re working on that.</p>
          </section>
        </main>
      )
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};
