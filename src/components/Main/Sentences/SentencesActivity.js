import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActivityHeader from '../ActivityHeader';
import SentenceBoard from './SentenceBoard';
import FinalMessage from '../FinalMessage';

import './sentences.css';

class SentencesActivity extends Component {
  state = {
    isShownMessage: false,
  }

  showMessage = (isShownMessage) => {
    this.setState({ isShownMessage });
  }

  render() {
    const { isShownMessage } = this.state;
    const { match } = this.props;
    const { lang, category, id } = match.params;

    return (
      <div className="activity">
        <div className="activity__wrap">

          <ActivityHeader heading="Sentences" page={`${lang}/sentences`} />

          <SentenceBoard
            lang={lang}
            type="sentences"
            category={category}
            activityId={id}
            showMessage={this.showMessage}
          />

          {isShownMessage && (
            <FinalMessage
              type="sentences"
              lang={lang}
            />
          )}

        </div>
      </div>
    );
  }
}

SentencesActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default SentencesActivity;
