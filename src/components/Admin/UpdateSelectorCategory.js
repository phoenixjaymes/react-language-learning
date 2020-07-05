import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import styles from './forms.module.css';

const UpdateSelectorCategory = ({ categoryType, handleIconClick }) => {
  const value = useContext(LearningContext);
  const { categories } = value;
  const [modifyList, setModifyList] = useState([]);

  const makeTableRows = (data) => (
    data.map((item) => (
      <tr key={item.id}>
        <td className={styles.itemSelectorTranslation}>
          <span className="tool" data-tip={item.name}>
            {item.name}
          </span>
        </td>
        <td className={styles.itemSelectorEdit}>
          <button
            type="button"
            className="btn-edit"
            data-id={item.id}
            data-category={item.name}
            onClick={handleIconClick}
          >
            -
          </button>
        </td>
      </tr>
    )));

  const memoMakeTableRows = useCallback(makeTableRows, [categories.all, categoryType]);

  useEffect(() => {
    setModifyList(memoMakeTableRows(categories.all[categoryType]));
  }, [memoMakeTableRows, categories.all, categoryType]);

  return (
    <form className={styles.formItemSelector} id="frmListWords">
      <h3 className={styles.header}>Item Selector</h3>

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

UpdateSelectorCategory.propTypes = {
  categoryType: PropTypes.string.isRequired,
  handleIconClick: PropTypes.func.isRequired,
};

export default UpdateSelectorCategory;
