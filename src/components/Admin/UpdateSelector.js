import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import FormSelect from './FormSelect';
import FormMessage from './FormMessage';
import styles from './forms.module.css';

const UpdateSelector = ({
  categoryType, handleIconClick, fetchUrl, propNameDisplay, propNameToolTip,
}) => {
  const value = useContext(LearningContext);
  const { lang, categories } = value;
  const [modifyList, setModifyList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [fetchStatus, setFetchStatus] = useState('');
  const [fetchResponse, setFetchResponse] = useState('');

  const makeTableRows = (data) => (
    data.map((item) => (
      <tr key={item.id}>
        <td className={styles.itemSelectorTranslation}>
          <span className="tool" data-tip={item[propNameToolTip]}>
            {item[propNameDisplay]}
          </span>
        </td>
        <td className={styles.itemSelectorEdit}>
          <button
            type="button"
            className="btn-edit"
            data-id={item.id}
            onClick={handleIconClick}
          >
            -
          </button>
        </td>
      </tr>
    )));

  const handleSelect = (e) => {
    const categoryId = e.target.value;
    setSelectedOption(categoryId);

    if (categoryId === '') {
      return;
    }

    fetch(`${fetchUrl}${categoryId}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          const wordList = makeTableRows(responseData.data);
          setModifyList(wordList);
        } else {
          setFetchResponse('fail');
          setFetchStatus('Unable to get list');
        }
      })
      .catch((error) => {
        setFetchResponse('error');
        setFetchStatus(`Error fetching and parsing data. ${error}`);
      });
  };

  return (
    <form className={styles.formItemSelector} id="frmListWords">
      <h3 className={styles.header}>Item Selector</h3>

      <FormSelect
        name="selectedOption"
        label=""
        categories={categories[lang][categoryType]}
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
      <FormMessage response={fetchResponse} status={fetchStatus} />
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
