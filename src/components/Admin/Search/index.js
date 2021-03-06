import React, { Component } from 'react';
import { LearningContext } from '../../Context';

import SearchResults from './SearchResults';

import svgSearch from './search.svg';
import styles from './search.module.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: [],
      modifiedData: [],
      itemSearchType: '',
      itemRange: '',
      extraOptions: [],
    };
  }

  handleType = (e) => {
    const value = this.context;
    const { lang, categories } = value;
    const eValue = e.target.value;
    const catNames = {
      adjectives: 'adjective',
      blanks: 'blank',
      categories: 'category',
      nouns: 'noun',
      phrases: 'phrase',
      sentences: 'sentence',
      verbs: 'verb',
    };

    this.setState({
      itemSearchType: eValue,
      itemRange: '',
      extraOptions: categories[lang][catNames[eValue]],
    });
  };

  handleRange = (e) => this.setState({ itemRange: e.target.value });

  handleSearchClick = () => {
    const { itemSearchType, itemRange } = this.state;
    const { lang, categories } = this.context;
    const verbCats = categories[lang].verb;
    const categoryCats = categories[lang].category;
    let fetchUrl = 'https://phoenixjaymes.com/api/language/';

    if (itemSearchType === '' || itemRange === '') {
      return;
    }

    if (itemSearchType !== 'categories') {
      const value = Number.parseInt(itemRange, 10);

      if (Number.isInteger(value) && itemSearchType === 'verbs') {
        const tempVerbRange = verbCats.filter((obj) => obj.id === itemRange);
        fetchUrl += `${itemSearchType}?lang=${lang}&${tempVerbRange[0].name}=yes`;
      } else if (Number.isInteger(value)) {
        fetchUrl += `${itemSearchType}?lang=${lang}&cat=${itemRange}`;
      } else {
        fetchUrl += `${itemSearchType}?lang=${lang}&range=${itemRange}`;
      }
    } else if (itemSearchType === 'categories') {
      const tempCatRange = categoryCats.filter((obj) => obj.id === itemRange);
      fetchUrl += `${itemSearchType}?lang=${lang}&type=${tempCatRange[0].name}`;
    }

    fetch(fetchUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          jsonData: responseData.data,
          modifiedData: responseData.data,
        });
        // if (responseData.status === 'success') {
        //   this.clearForm();
        //   this.setState({ response: `${responseData.status}: ${responseData.data.message}` });
        // } else if (responseData.status === 'fail') {
        //   this.setState({ response: Object.values(responseData.data).join(', ') });
        // } else {
        //   this.setState({ response: `${responseData.status}: ${responseData.data.message}` });
        // }
        // this.setState({ status: responseData.status });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  render() {
    const {
      jsonData,
      modifiedData,
      itemSearchType,
      itemRange,
      extraOptions,
    } = this.state;
    const { lang } = this.context;
    let results;

    if (jsonData.status === 'fail') {
      results = <h3>No results were returned</h3>;
    } else {
      results = (
        <SearchResults
          data={modifiedData}
          sortTable={this.sortTable}
          itemSearchType={itemSearchType}
          lang={lang}
        />
      );
    }

    return (
      <div>
        <form
          className={styles.searchForm}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <label className={styles.searchFormLabel} htmlFor="selType">
            Search Type
            <select
              id="selType"
              name="selType"
              value={itemSearchType}
              onChange={this.handleType}
            >
              <option value="">Select Type</option>
              <option value="adjectives">Adjective</option>
              <option value="blanks">Blank</option>
              <option value="categories">Category</option>
              <option value="nouns">Noun</option>
              <option value="phrases">Phrase</option>
              <option value="sentences">Sentence</option>
              <option value="verbs">Verb</option>
            </select>
          </label>

          <label className={styles.searchFormLabel} htmlFor="selRange">
            Range
            <select
              id="selRange"
              name="selRange"
              value={itemRange}
              onChange={this.handleRange}
            >
              <option value="">Select Range</option>
              {itemSearchType !== 'categories' && (
                <>
                  <option value="a-d">A - D</option>
                  <option value="e-h">E - H</option>
                  <option value="i-l">I - L</option>
                  <option value="m-p">M - P</option>
                  <option value="q-t">Q - T</option>
                  <option value="u-z">U - Z</option>
                  <option value="umlauts">Umlauts</option>
                </>
              )}

              {extraOptions.length > 0
                && extraOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
          <div className={styles.searchFormBtnSearch}>
            <button
              onClick={this.handleSearchClick}
              type="button"
              onKeyPress={this.handleSearchClick}
            >
              <img src={svgSearch} alt="search" />
            </button>
          </div>
        </form>

        {results}
      </div>
    );
  }
}

Search.contextType = LearningContext;

export default Search;
