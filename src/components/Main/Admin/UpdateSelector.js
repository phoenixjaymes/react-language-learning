import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import FormSelect from './FormSelect';

import styles from './forms.module.css';

const UpdateSelector = ({
  categoryType, handleIconClick, fetchUrl, propNameDisplay, propNameToolTip,
}) => {
  const value = useContext(LearningContext);
  const { lang, categories } = value;
  const [modifyList, setModifyList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const generalCatNames = ['general', 'generalSentence', 'generalPhrase'];
  const categoriesLang = generalCatNames.includes(categoryType) ? 'all' : lang;

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

  return (
    <form className={styles.formItemSelector} id="frmListWords">
      <h3 className={styles.header}>Item Selector</h3>

      <FormSelect
        name="selectedOption"
        label=""
        categories={categories[categoriesLang][categoryType]}
        selected={selectedOption}
        handleCategory={handleSelect}
      />

      <div className={styles.itemSelector}>
        <div className={styles.itemSelectorWrap}>
          <table className={styles.itemSelectorTable}>
            <tbody>
              <tr>
                <th className={styles.itemSelectorTranslation}>Translation</th>
                <th className={styles.itemSelectorEdit}> </th>
              </tr>

              {modifyList}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
};

UpdateSelector.propTypes = {
  categoryType: PropTypes.string.isRequired,
  handleIconClick: PropTypes.func.isRequired,
  fetchUrl: PropTypes.string,
  propNameDisplay: PropTypes.string,
  propNameToolTip: PropTypes.string,
};

export default UpdateSelector;
