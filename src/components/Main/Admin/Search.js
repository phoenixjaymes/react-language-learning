import React, { Component } from 'react';
import { LearningContext } from '../../Context';

import SearchResults from './SearchResults';

import svgSearch from './search.svg';
import '../../../css/search.css';

class Search extends Component {
  state = {
    jsonData: [],
    modifiedData: [],
    itemType: '',
    itemRange: 'a-d',
    sortColumn: '',
    sortDirection: '',
  }

  handleType = e => this.setState({ itemType: e.target.value })

  handleRange = e => this.setState({ itemRange: e.target.value })

  handleSearchClick = () => {
    const { itemType, itemRange } = this.state;
    const { lang } = this.context;

    if (itemType === '') {
      return;
    }

    fetch(`http://phoenixjaymes.com/assets/data/language/get-search.php?lang=${lang}&type=${itemType}&range=${itemRange}`)
      .then(reponse => reponse.json())
      .then(
        (responseData) => {
          this.setState({
            jsonData: responseData,
            modifiedData: responseData,
          });
        },
      )
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  sortTable = (e) => {
    const dataId = e.target.getAttribute('data-id');

    if (dataId === 'id') {
      this.sortId();
    } else {
      this.sortColumns(dataId);
    }
  }

  sortId = () => {
    const { jsonData, sortColumn, sortDirection } = this.state;
    let sortedData;

    if (sortColumn !== 'id') {
      this.setState({ sortColumn: 'id', sortDirection: 'asc' });
      sortedData = jsonData.sort((a, b) => a.id - b.id);
    } else if (sortColumn === 'id' && sortDirection === 'asc') {
      this.setState({ sortDirection: 'dsc' });
      sortedData = jsonData.sort((a, b) => b.id - a.id);
    } else if (sortColumn === 'id' && sortDirection === 'dsc') {
      this.setState({ sortDirection: 'asc' });
      sortedData = jsonData.sort((a, b) => a.id - b.id);
    }

    this.setState({ modifiedData: sortedData });
  }

  sortColumns = (dataId) => {
    const { jsonData, sortColumn, sortDirection } = this.state;
    let sortedData;

    if (sortColumn !== dataId) {
      this.setState({ sortColumn: dataId, sortDirection: 'asc' });
      sortedData = jsonData.sort((a, b) => this.sortAsc(a, b, dataId));
    } else if (sortColumn === dataId && sortDirection === 'asc') {
      this.setState({ sortDirection: 'dsc' });
      sortedData = jsonData.sort((a, b) => this.sortDsc(a, b, dataId));
    } else if (sortColumn === dataId && sortDirection === 'dsc') {
      this.setState({ sortDirection: 'asc' });
      sortedData = jsonData.sort((a, b) => this.sortAsc(a, b, dataId));
    }

    this.setState({ modifiedData: sortedData });
  }

  sortAsc = (a, b, dataId) => {
    const nameA = a[dataId].toUpperCase(); // ignore upper and lowercase
    const nameB = b[dataId].toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  sortDsc = (a, b, dataId) => {
    const nameA = a[dataId].toUpperCase(); // ignore upper and lowercase
    const nameB = b[dataId].toUpperCase(); // ignore upper and lowercase

    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  render() {
    const {
      jsonData, modifiedData, itemType, itemRange,
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

          <label className="search-form__label">
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
