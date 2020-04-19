import React, { Component } from "react";
import PropTypes from "prop-types";
import { LearningContext } from "../../Context";

import styles from "./forms.module.css";

class UpdateSelector extends Component {
  state = {
    isVisible: true,
    modifyList: [],
  };

  handleShowHideClick = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  handleSelectOrButton = (e) => {
    const categoryId = e.target.value;
    const { lang } = this.context;
    const { type, handleIconClick } = this.props;

    fetch(
      `https://phoenixjaymes.com/assets/data/language/updates?qnt=all&lang=${lang}&pos=${type}&category=${categoryId}`
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const wordList = responseData.data.map((item) => (
          <tr key={item.id}>
            <td className={styles.itemSelectorTranslation}>
              <span className="tool" data-tip={item.english}>
                {item.translation}
              </span>
            </td>
            <td className={styles.itemSelectorEdit}>
              <a
                href="#null"
                className="btn-edit"
                data-id={item.id}
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

  getChild = () => {
    const { children } = this.props;
    if (children.type === "span") {
      return React.cloneElement(children, {
        onClick: this.handleSelectOrButton,
      });
    }

    return React.cloneElement(children, {
      onChange: this.handleSelectOrButton,
    });
  };

  render() {
    const { modifyList } = this.state;
    return (
      <form className={styles.formItemSelector} id="frmListWords">
        <h3 className={styles.header}>Item Selector</h3>
        <label className={styles.label} htmlFor="selCategoryList">
          {this.getChild()}
        </label>

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
