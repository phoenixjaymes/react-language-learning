import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import ChangeCategoryButton from './CardsChangeCategoryButton';
import ActivityLink from '../ActivityComponents/ActivityLink';

// Cards Component
class Cards extends Component {
  state = {
    category: 'adjective',
    catagoryList: [],
  }

  componentDidMount() {
    const value = this.context;
    const { setDocumentTitle } = value.actions;

    setDocumentTitle('Flash Cards');
  }

  changeCategory = (categoryName) => {
    const { match } = this.props;
    const { lang } = match.params;
    const value = this.context;

    this.setState({
      category: categoryName,
      catagoryList: value.categories[lang][categoryName],
    });
  }

  render() {
    const { lang, labels } = this.context;
    const { category, catagoryList } = this.state;
    const headingLabel = labels.us.languages[lang];

    const buttons = catagoryList.map(option => (
      <ActivityLink
        key={option.id}
        toPath={`/${lang}/cards/${category}/${option.id}`}
        text={option.name}
      />
    ));

    return (
      <section className="activity-section">
        <h1>{`${headingLabel} Cards`}</h1>

        <h3>Select your Cards</h3>

        <div className="activity-buttons">
          <ChangeCategoryButton category="adjective" changeCategory={this.changeCategory} />
          <br />
          <ChangeCategoryButton category="noun" changeCategory={this.changeCategory} />
          {lang !== 'za' && (
            <ChangeCategoryButton category="gender" changeCategory={this.changeCategory} />
          )}
          <br />
          <ChangeCategoryButton category="verb" changeCategory={this.changeCategory} />
          <br />
          <ActivityLink
            toPath={`/${lang}/cards/phrase`}
            text="Phrases"
          />
          <ActivityLink
            toPath={`/${lang}/cards/study`}
            text="Study"
          />
        </div>

        <div className="activity-buttons activity-categories">
          {buttons}
        </div>
      </section>
    );
  }
}

Cards.contextType = LearningContext;

Cards.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default Cards;
