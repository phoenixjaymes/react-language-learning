import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActivityHeader from '../ActivityHeader';
import WordBoard from './WordBoard';
import FinalMessage from '../FinalMessage';

import './words.css';

class WordsActivity extends Component {
  state = {
    isShownMessage: false,
  }

  showMessage = (isShownMessage) => {
    this.setState({ isShownMessage });
  }

  render() {
    const { isShownMessage } = this.state;
    const { match } = this.props;
    const { lang, category } = match.params;
    const wordsCategory = category.charAt(0).toUpperCase() + category.slice(1);

    return (
      <div className="activity">
        <div className="activity__wrap">
          <ActivityHeader heading={`Match the ${wordsCategory}`} page={`${match.params.lang}/words`} />

          <WordBoard
            lang={match.params.lang}
            category={match.params.category}
            showMessage={this.showMessage}
          />

          {isShownMessage && (
            <FinalMessage
              type="words"
              lang={lang}
            />
          )}
        </div>
      </div>
    );
  }
}

WordsActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default WordsActivity;