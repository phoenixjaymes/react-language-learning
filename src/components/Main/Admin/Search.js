import React, { Component } from 'react';
import { LearningContext } from '../../Context';

import SearchResults from './SearchResults';

import svgSearch from './search.svg';
import '../../../css/search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: [],
      modifiedData: [],
      itemType: '',
      itemRange: 'a-d',
      extraOptions: [],
    };
  }

  getExtraOptions = (itemType) => {
    const value = this.context;
    const { lang, categories } = value;
    // const options = categories[lang][itemType].map((item) => (
    //   <option key={item.id} value={item.id}>{item.name}</option>
    // ));

    this.setState({ extraOptions: categories[lang][itemType] });
  }

  handleType = (e) => {
    if (e.target.value === 'adjective'
    || e.target.value === 'noun'
    || e.target.value === 'verb') {
      this.getExtraOptions(e.target.value);
      this.setState({ itemType: e.target.value });
    } else {
      this.setState({
        itemType: e.target.value,
        extraOptions: [],
      });
    }
  }

  handleRange = (e) => this.setState({ itemRange: e.target.value })

  handleSearchClick = () => {
    const { itemType, itemRange } = this.state;
    const { lang } = this.context;

    if (itemType === '') {
      return;
    }

    fetch(`http://phoenixjaymes.com/assets/data/language/get-search.php?lang=${lang}&type=${itemType}&range=${itemRange}`)
      .then((reponse) => reponse.json())
      .then(
        (responseData) => {
          this.setState({
            jsonData: responseData.data,
            modifiedData: responseData.data,
          });
        },
      )
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    const {
      jsonData, modifiedData, itemType, itemRange, extraOptions,
    } = this.state;
    let results;

    if (jsonData.status === 'fail') {
      results = <h3>No results were returned</h3>;
    } else {
      results = <SearchResults data={modifiedData} sortTable={this.sortTable} />;
    }

    return (
      <div>
        <form className="search-form" autoComplete="off" onSubmit={this.handleSubmit}>

          <label className="search-form__label" htmlFor="selType">
            Search Type
            <select
              id="selType"
              name="selType"
              value={itemType}
              onChange={this.handleType}
            >
              <option value="">Select Type</option>
              <option value="adjective">Adjective</option>
              <option value="category">Category</option>
              <option value="noun">Noun</option>
              <option value="phrase">Phrase</option>
              <option value="sentence">Sentence</option>
              <option value="verb">Verb</option>
            </select>
          </label>

          <label className="search-form__label" htmlFor="selRange">
            Range
            <select
              id="selRange"
              name="selRange"
              value={itemRange}
              onChange={this.handleRange}
            >
              <option value="a-d">A - D</option>
              <option value="e-h">E - H</option>
              <option value="i-l">I - L</option>
              <option value="m-p">M - P</option>
              <option value="q-t">Q - T</option>
              <option value="u-z">U - Z</option>
              <option value="umlauts">Umlauts</option>
              {extraOptions.length > 0 && (
                extraOptions.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              )}
            </select>
          </label>
          <div className="search-form__btn-search">
            <span onClick={this.handleSearchClick} role="button" onKeyPress={this.handleSearchClick}>
              <img src={svgSearch} alt="search" />
            </span>
          </div>
        </form>

        {results}

      </div>
    );
  }
}

Search.contextType = LearningContext;

export default Search;
