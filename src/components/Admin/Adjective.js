import React, {
  useState, useContext, useReducer, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormSelect from './FormComponents/FormSelect';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Adjective = ({
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
    example: '',
    img: 'none',
    category: '',
    category2: '5',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { categories, lang, labels } = useContext(LearningContext);
  const { us } = labels;
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

  useEffect(() => {
    if (updateId !== undefined) {
      fetchUpdatedData(`https://phoenixjaymes.com/api/language/adjectives/${updateId}?lang=${lang}`);
    }
  }, [fetchUpdatedData, updateId, lang]);

  useEffect(() => {
    if (updateData.id !== undefined) {
      setFormState(updateData);
    }
  }, [updateData]);

  const clearForm = () => {
    if (modifyType === 'update') {
      setFormState({
        id: '',
        english: '',
        translation: '',
        example: '',
        image: 'none',
        category: '',
        category2: '5',
      });
    } else {
      setFormState({
        id: '',
        english: '',
        translation: '',
        example: '',
        image: 'none',
      });
    }
  };

  const memoizedClearForm = useCallback(clearForm, []);

  useEffect(() => {
    if (actionSuccess === true) {
      memoizedClearForm();
    }
  }, [actionSuccess, memoizedClearForm]);

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/adjectives/${itemId}?lang=${lang}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const isValid = () => {
    if (
      formState.english === ''
      || formState.translation === ''
      || formState.example === ''
      || formState.img === ''
      || formState.category === ''
      || formState.category2 === ''
    ) {
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
      fetchUrl = `https://phoenixjaymes.com/api/language/adjectives?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/adjectives/${formState.id}?lang=${lang}`;
    }

    handleSubmit(modifyType, fetchUrl, formState, initialFormState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const langName = us.languages[lang];
  const heading = modifyType === 'update'
    ? `Update ${langName} Adjectives`
    : `Add ${langName} Adjectives`;
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';

  const fetchUrl = `https://phoenixjaymes.com/api/language/adjectives?lang=${lang}&cat=`;

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        onFocus={handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <div className="form__grid-2">
          <FormSelect
            name="category"
            label="Category 1"
            categories={categories.all.general}
            selected={formState.category}
            handleCategory={handleChange}
          />
          <FormSelect
            name="category2"
            label="Category 2"
            categories={categories.all.general}
            selected={formState.category2}
            handleCategory={handleChange}
          />
        </div>

        <FormInput
          label="English"
          name="english"
          value={formState.english}
          handleChange={handleChange}
        />

        <FormInput
          label="Translation"
          name="translation"
          value={formState.translation}
          handleChange={handleChange}
        />

        <FormInput
          label="Example"
          name="example"
          value={formState.example}
          handleChange={handleChange}
        />

        <FormInput
          label="Image"
          name="img"
          value={formState.img}
          handleChange={handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="adjective"
          handleIconClick={handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="translation"
          propNameToolTip="english"
        />
      )}
    </div>
  );
};

Adjective.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateId: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
  actionSuccess: PropTypes.bool,
};

export default withFormWrap(Adjective);
