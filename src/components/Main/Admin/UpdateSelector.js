import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

class UpdateSelector extends Component {
  state = {
    isVisible: true,
    modifyList: [],
  }

  handleShowHideClick = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  }

  handleSelectOrButton = (e) => {
    const categoryId = e.target.value;
    const { lang } = this.context;
    const { type, handleIconClick } = this.props;

    fetch(`http://phoenixjaymes.com/assets/data/language/updates?qnt=all&lang=${lang}&pos=${type}&category=${categoryId}`)
      .then(reponse => reponse.json())
      .then(
        (responseData) => {
          const wordList = responseData.data.map(item => (
            <tr key={item.id}>
              <td className="item-select__table-td-translation">
                <span className="tool" data-tip={item.english}>{item.translation}</span>
              </td>
              <td className="item-select__table-td-edit">
                <a href="#null" className="btn-edit" data-id={item.id} onClick={handleIconClick}>-</a>
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

  getChild = () => {
    const { children } = this.props;
    if (children.type === 'span') {
      return React.cloneElement(children, { onClick: this.handleSelectOrButton });
    }

    return React.cloneElement(children, { onChange: this.handleSelectOrButton });
  }

  render() {
    const { modifyList } = this.state;
    return (
      <form className="form--item-selector" id="frmListWords">
        <h3 className="form__header">Item Selector</h3>
        <label className="form__label" htmlFor="selCategoryList">
          {this.getChild()}
        </label>

        <div className="item-select">
          <div className="item-select__wrap">
            <table className="item-select__table">
              <tbody>
                <tr>
                  <th className="item-select__table-td-translation">Translation</th>
                  <th className="item-select__table-td-edit" />
                </tr>

                {modifyList}

              </tbody>
            </table>
          </div>
        </div>
      </form>
    );
  }
}

UpdateSelector.contextType = LearningContext;

UpdateSelector.propTypes = {
  type: PropTypes.string.isRequired,
  handleIconClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default UpdateSelector;
