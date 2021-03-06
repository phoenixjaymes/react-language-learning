import React, {
  useState, useContext, useReducer, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import UpdateSelector from './UpdateSelector';
import FormTextarea from './FormComponents/FormTextarea';
import FormSelect from './FormComponents/FormSelect';
import FormMessage from './FormComponents/FormMessage';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Phrase = ({
  handleSubmit,
  categoryName,
  modifyType,
  updateId,
  fetchUpdatedData,
  updateData,
  actionSuccess,
}) => {
  const initialFormState = {
    id: '',
    english: '',
    translation: '',
    category: '',
    daily: '',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { categories, lang, labels } = useContext(LearningContext);
  const { us } = labels;
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

  useEffect(() => {
    if (updateId !== undefined) {
      fetchUpdatedData(`https://phoenixjaymes.com/api/language/phrases/${updateId}?lang=${lang}`);
    }
  }, [fetchUpdatedData, updateId, lang]);

  useEffect(() => {
    if (updateData.id !== undefined) {
      setFormState(updateData);
    }
  }, [updateData]);

  const clearForm = () => {
    setFormState({
      id: '',
    });
  };

  const memoizedClearForm = useCallback(clearForm, []);

  useEffect(() => {
    if (actionSuccess === true) {
      memoizedClearForm();
    }
  }, [actionSuccess, memoizedClearForm]);

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/phrases/${itemId}?lang=${lang}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const isValid = () => {
    if (formState.english === '' || formState.translation === '' || formState.category === '') {
      return false;
    }
    return true;
  };

  const handleFocus = () => {
    setMessageValues({ message: '', status: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let fetchUrl = '';

    if (!isValid()) {
      setMessageValues({
        message: 'Please fill in all feilds',
        status: 'fail',
      });
      return;
    }

    setMessageValues({ message: '', status: '' });

    if (modifyType === 'add') {
      fetchUrl = `https://phoenixjaymes.com/api/language/phrases?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/phrases/${formState.id}?lang=${lang}`;
    }

    handleSubmit(modifyType, fetchUrl, formState, initialFormState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const langName = us.languages[lang];
  const heading = modifyType === 'update'
    ? `Update ${langName} Phrases`
    : `Add ${langName} Phrases`;
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
  const fetchUrl = `https://phoenixjaymes.com/api/language/phrases?lang=${lang}&cat=`;

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={handleFormSubmit}
        onFocus={handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <FormSelect
          name="category"
          label="Category"
          categories={categories.all.generalPhrase}
          selected={formState.category}
          handleCategory={handleChange}
        />

        <FormTextarea
          label="English"
          name="english"
          value={formState.english}
          handleChange={handleChange}
        />

        <FormTextarea
          label="Translation"
          name="translation"
          value={formState.translation}
          handleChange={handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="phrase"
          handleIconClick={handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="translation"
          propNameToolTip="english"
        />
      )}
    </div>
  );
};

Phrase.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateId: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
  actionSuccess: PropTypes.bool,
};

export default withFormWrap(Phrase);
