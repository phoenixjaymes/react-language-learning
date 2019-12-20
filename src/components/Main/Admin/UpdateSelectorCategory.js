import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateSelectorCategory extends Component {
  state = {
    isVisible: true,
    modifyList: [],
  }

  handleShowHideClick = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  }

  handleSelectOrButton = (type) => {
    const { handleIconClick } = this.props;

    fetch(`http://phoenixjaymes.com/assets/data/language/get-update-words.php?pos=category&type=${type}`)
      .then(reponse => reponse.json())
      .then(
        (responseData) => {
          const wordList = responseData.map(item => (
            <tr key={item.id}>
              <td className="item-select__table-td-translation">
                <span className="tool" data-tip={item.category}>{item.category}</span>
              </td>
              <td className="item-select__table-td-edit">
                <a href="#null" className="btn-edit" data-id={item.id} data-type={type} onClick={handleIconClick}>-</a>
              </td>
            </tr>
          ));
          this.setState({ modifyList: wordList });
        },
      )
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    const { modifyList } = this.state;
    return (
      <div>
        {/* <button type="button" style={{ height: '40px', lineHeight: '40px' }} onClick={this.handleShowHideClick}>
          Update List
          <span style={{
            fontWeight: 'bold', fontSize: '30px', lineHeight: '40px', paddingLeft: '5px',
          }}
          >
            {this.props.isVisible ? '-' : '+'}
          </span>
        </button> */}

        <form className="form--item-selector" id="frmListWords" style={this.state.isVisible ? { display: 'block' } : { display: 'none' }}>
          <h3 className="form__header">Word List</h3>

          <button type="button" onClick={() => this.handleSelectOrButton('word')}>Word Categories</button>
          <button type="button" onClick={() => this.handleSelectOrButton('sentence')}>Sentence Categories</button>

          <div className="item-select">
            <div className="item-select__wrap">
              <table className="item-select__table">
                <tbody>
                  <tr>
                    <th className="item-select__table-td-translation">Translation</th>
                    <th className="item-select__table-td-edit">-</th>
                  </tr>

                  {modifyList}

                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

UpdateSelectorCategory.propTypes = {
  handleIconClick: PropTypes.func.isRequired,
};

export default UpdateSelectorCategory;
