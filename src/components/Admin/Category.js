import React, { useState, useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import UpdateSelectorCategory from './UpdateSelectorCategory';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import CategoryRadioButtons from './FormComponents/CategoryRadioButtons';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Category = ({
  handleSubmit,
  categoryName,
  modifyType,
  updateId,
  actionSuccess,
}) => {
  const initialFormState = {
    id: '',
    type: 'general',
    name: '',
    categoryType: 'general',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

  // useEffect(() => {
  //   if (updateId !== undefined) {
  //     fetchUpdatedData(`https://phoenixjaymes.com/api/language/adjectives/${updateId}?lang=${lang}`);
  //   }
  // }, [fetchUpdatedData, updateId, lang]);

  const clearForm = () => {
    setFormState({
      name: '',
    });
  };

  const memoizedClearForm = useCallback(clearForm, []);

  useEffect(() => {
    if (actionSuccess === true) {
      memoizedClearForm();
    }
  }, [actionSuccess, memoizedClearForm]);

  const handleIconClick = (e) => {
    const id = e.target.getAttribute('data-id');
    const name = e.target.getAttribute('data-category');
    setFormState({ id, name });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const handleRadio = (itemType) => {
    let temp = 'general';

    if (itemType !== 'general') {
      temp = `general${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`;
    }

    setFormState({
      type: itemType,
      categoryType: temp,
    });
  };

  const isValid = () => {
    if (formState.category === '' || formState.type === '') {
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
      fetchUrl = 'https://phoenixjaymes.com/api/language/categories';
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/categories/${formState.id}`;
    }

    handleSubmit(modifyType, fetchUrl, formState, initialFormState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const heading = modifyType === 'update' ? 'Update Category' : 'Add Category';
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        onFocus={handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <CategoryRadioButtons handleRadio={handleRadio} />

        <FormInput
          label="Name"
          name="name"
          value={formState.name}
          handleChange={handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelectorCategory
          categoryType={formState.categoryType}
          handleIconClick={handleIconClick}
        />
      )}
    </div>
  );
};

Category.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateId: PropTypes.string,
  actionSuccess: PropTypes.bool,
};

export default withFormWrap(Category);
