import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import FormSelect from './FormSelect';

import styles from './forms.module.css';

const UpdateSelector = ({
  type, handleIconClick, children, fetchUrl, propNameDisplay, propNameToolTip,
}) => {
  const value = useContext(LearningContext);
  const { lang, categories } = value;
  // const [isVisible, setIsVisible] = useState(true);
  const [modifyList, setModifyList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  // const handleShowHideClick = () => {
  //   const { isVisible } = this.state;
  //   this.setState({ isVisible: !isVisible });
  // };

  const handleSelect = (e) => {
    const categoryId = e.target.value;
    setSelectedOption(categoryId);

    if (categoryId === '') {
      return;
    }

    fetch(`${fetchUrl}${categoryId}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const wordList = responseData.data.map((item) => (
          <tr key={item.id}>
            <td className={styles.itemSelectorTranslation}>
              <span className="tool" data-tip={item[propNameToolTip]}>
                {item[propNameDisplay]}
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

        setModifyList(wordList);
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  // const getChild = () => {
  //   if (children.type === 'span') {
  //     return React.cloneElement(children, {
  //       onClick: handleSelect,
  //     });
  //   }

  //   return React.cloneElement(children, {
  //     onChange: handleSelect,
  //   });
  // };

  return (
    <form className={styles.formItemSelector} id="frmListWords">
      <h3 className={styles.header}>Item Selector</h3>
      {/* <label className={styles.label} htmlFor="selCategoryList">
        {getChild()}
      </label> */}

      <FormSelect
        name="selectedOption"
        label=""
        categories={categories[lang].sentence_cat}
        selected={selectedOption}
        handleCategory={handleSelect}
      />

      <div className={styles.itemSelector}>
        <div className={styles.itemSelectorWrap}>
          <table className={styles.itemSelectorTable}>
            <tbody>
              <tr>
                <th className={styles.itemSelectorTranslation}>Translation</th>
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

UpdateSelector.propTypes = {
  type: PropTypes.string.isRequired,
  handleIconClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  fetchUrl: PropTypes.string,
  propNameDisplay: PropTypes.string,
  propNameToolTip: PropTypes.string,
};

export default UpdateSelector;
