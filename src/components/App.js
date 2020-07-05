import React, { Component } from 'react';
import { LearningContext } from './Context';

import './app.css';

import '../css/styles.css';

// Components
import Header from './Header';
import RoutesComponent from './RoutesComponent';
import Footer from './Footer';
import Loading from './Loading';
import LoadingError from './Loading/LoadingError';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLangMenuVisible: false,
      isActivityMenuVisible: false,
      isGrammarMenuShown: false,
    };
  }

  setSubMenuVisible = (e) => {
    const { isLangMenuVisible, isActivityMenuVisible, isGrammarMenuShown } = this.state;
    if (e.target.closest('#js-lang')) {
      this.setState({
        isLangMenuVisible: !isLangMenuVisible,
        isActivityMenuVisible: false,
        isGrammarMenuShown: false,
      });
    } else if (e.target.closest('#js-activity')) {
      this.setState({
        isLangMenuVisible: false,
        isActivityMenuVisible: !isActivityMenuVisible,
        isGrammarMenuShown: false,
      });
    } else if (e.target.closest('#js-grammar')) {
      this.setState({
        isLangMenuVisible: false,
        isActivityMenuVisible: false,
        isGrammarMenuShown: !isGrammarMenuShown,
      });
    } else {
      this.setState({
        isLangMenuVisible: false,
        isActivityMenuVisible: false,
        isGrammarMenuShown: false,
      });
    }
  }

  renderLoading = () => <Loading />;

  renderError = () => <LoadingError />;

  renderApp = () => {
    const { isLangMenuVisible, isActivityMenuVisible, isGrammarMenuShown } = this.state;

    return (
      <div className="container" onClick={this.setSubMenuVisible} role="presentation">
        <Header
          isLangMenuVisible={isLangMenuVisible}
          isActivityMenuVisible={isActivityMenuVisible}
        />
        <ErrorBoundary>
          <RoutesComponent isGrammarMenuShown={isGrammarMenuShown} />
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }

  render() {
    const value = this.context;
    const { loading, error } = value;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderError();
    }

    return this.renderApp();
  }
}

App.contextType = LearningContext;
export default App;
