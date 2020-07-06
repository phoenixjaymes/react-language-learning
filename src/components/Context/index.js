import React, { Component } from 'react';
import PropTypes from 'prop-types';

import labels from './labelTranslations';

export const LearningContext = React.createContext();
LearningContext.displayName = 'LearningContext';
const { Consumer } = LearningContext;
export const LearningConsumer = Consumer;

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'de',
      loading: true,
      error: false,
      jsonCategories: {},
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const categories = sessionStorage.getItem('categories');
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    if (loggedIn) {
      this.setState({ isLoggedIn: true });
    }

    if (categories) {
      this.setState({
        jsonCategories: JSON.parse(categories),
        loading: false,
      });
    } else {
      fetch('https://phoenixjaymes.com/api/language/categories/app')
        .then((reponse) => reponse.json())
        .then((responseData) => {
          sessionStorage.setItem(
            'categories',
            JSON.stringify(responseData.data),
          );
          this.setState({
            jsonCategories: responseData.data,
            loading: false,
          });
        })
        .catch((error) => {
          console.log('Error fetching and parsing data', error);

          this.setState({
            loading: false,
            error: true,
          });
        });
    }
  }

  refreshCategories = () => {
    this.setState({ loading: true });

    fetch('https://phoenixjaymes.com/api/language/categories/app')
      .then((reponse) => reponse.json())
      .then((responseData) => {
        sessionStorage.setItem('categories', JSON.stringify(responseData.data));
        this.setState({
          jsonCategories: responseData.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);

        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  setLogin = (loggedIn) => {
    if (loggedIn === true) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
      sessionStorage.removeItem('isLoggedIn');
    }
  };

  setLanguage = (lang) => {
    this.setState({ lang });
  };

  setDocumentTitle = (title) => {
    const { lang } = this.state;
    const languageNames = {
      de: 'German',
      nl: 'Dutch',
      af: 'Afrikaans',
    };

    document.title = `${languageNames[lang]} ${title} | Language Learning`;
  };

  render() {
    const {
      isLoggedIn, lang, jsonCategories, loading, error,
    } = this.state;
    const { children } = this.props;
    const value = {
      categories: jsonCategories,
      lang,
      isLoggedIn,
      loading,
      error,
      labels,
      actions: {
        setLanguage: this.setLanguage,
        setLogin: this.setLogin,
        setDocumentTitle: this.setDocumentTitle,
        refreshCategories: this.refreshCategories,
      },
    };

    return (
      <LearningContext.Provider value={value}>
        {children}
      </LearningContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.element,
};

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} WrappedComponent - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(WrappedComponent) {
  return function ContextComponent(props) {
    return (
      <Consumer>
        {(context) => <WrappedComponent {...props} context={context} />}
      </Consumer>
    );
  };
}
