import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./forms.module.css";

class UpdateSelectorCategory extends Component {
  state = {
    isVisible: true,
    modifyList: [],
  };

  handleShowHideClick = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  handleSelectOrButton = (type) => {
    const { handleIconClick } = this.props;

    fetch(
      `https://phoenixjaymes.com/assets/data/language/updates?qnt=all&pos=category&type=${type}`
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const wordList = responseData.data.map((item) => (
          <tr key={item.id}>
            <td className={styles.itemSelectorTranslation}>
              <span className="tool" data-tip={item.category}>
                {item.category}
              </span>
            </td>
            <td className={styles.itemSelectorEdit}>
              <a
                href="#null"
                className="btn-edit"
                data-id={item.id}
                data-type={type}
                onClick={handleIconClick}
              >
                -
              </a>
            </td>
          </tr>
        ));
        this.setState({ modifyList: wordList });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

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

        <form
          className={styles.formItemSelector}
          id="frmListWords"
          style={
            this.state.isVisible ? { display: "block" } : { display: "none" }
          }
        >
          <h3 className={styles.header}>Word List</h3>

          <button
            type="button"
            onClick={() => this.handleSelectOrButton("word")}
          >
            Word Categories
          </button>
          <button
            type="button"
            onClick={() => this.handleSelectOrButton("sentence")}
          >
            Sentence Categories
          </button>

          <div className={styles.itemSelector}>
            <div className={styles.itemSelectorWrap}>
              <table className={styles.itemSelectorTable}>
                <tbody>
                  <tr>
                    <th className={styles.itemSelectorTranslation}>
                      Translation
                    </th>
                    <th className={styles.itemSelectorEdit} />
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
