import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LearningContext } from '../../Context';

const CardOptionsLinks = ({ category, catagoryList, lang }) => {
  const buttons = catagoryList.map(option => (
    <Link key={option.id} to={`/${lang}/cards/${category}/${option.id}`} className="activity_buttons__btn">
      {option.name}
    </Link>
  ));

  return (
    <div className="activity-buttons activity-categories">
      {buttons}
    </div>
  );
};

CardOptionsLinks.propTypes = {
  catagoryList: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  lang: PropTypes.string,
};

const ActivityButton = ({ category, changeCategory }) => {
  const categoryUCase = category.charAt(0).toUpperCase() + category.substring(1);
  return (
    <button
      type="button"
      className="activity_buttons__btn"
      onClick={() => changeCategory(category)}
      onKeyPress={() => changeCategory(category)}
    >
      {categoryUCase}
    </button>
  );
};

ActivityButton.propTypes = {
  category: PropTypes.string,
  changeCategory: PropTypes.func,
};

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

    return (
      <section className="flashcards">
        <h1>{`${headingLabel} Cards`}</h1>

        <h3>Select your Cards</h3>

        <div className="activity-buttons">
          <ActivityButton category="adjective" changeCategory={this.changeCategory} />
          <br />
          <ActivityButton category="noun" changeCategory={this.changeCategory} />
          {lang !== 'za' && (
            <ActivityButton category="gender" changeCategory={this.changeCategory} />
          )}
          <br />
          <ActivityButton category="verb" changeCategory={this.changeCategory} />
          <br />
          <Link to={`/${lang}/cards/phrase`} className="activity_buttons__btn">Phrases</Link>
          <Link to={`/${lang}/cards/study`} className="activity_buttons__btn">Study</Link>
        </div>

        <CardOptionsLinks
          lang={lang}
          category={category}
          catagoryList={catagoryList}
        />
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
