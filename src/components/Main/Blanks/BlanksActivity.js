import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActivityHeader from '../ActivityHeader';
import BlanksBoard from './BlanksBoard';
import FinalMessage from '../FinalMessage';

// import './sentences.css';

class BlanksActivity extends Component {
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

          <ActivityHeader heading="Blanks" page={`${lang}/blanks`} />

          <BlanksBoard
            lang={lang}
            type="blanks"
            category={category}
            activityId={id}
            showMessage={this.showMessage}
          />

          {isShownMessage && (
            <FinalMessage
              type="blanks"
              lang={lang}
            />
          )}

        </div>
      </div>
    );
  }
}

BlanksActivity.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default BlanksActivity;
