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

const Noun = ({
  handleSubmit,
  categoryName,
  modifyType,
  fetchUpdatedData,
  updateData,
  actionSuccess,
}) => {
  const initialFormState = {
    id: '',
    english: '',
    base: '',
    translation: '',
    example: '',
    img: 'none',
    gender: '',
    category: '',
    category2: '5',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { categories, lang, labels } = useContext(LearningContext);
  const { us } = labels;
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

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
        base: '',
        translation: '',
        example: '',
        img: 'none',
        gender: '',
        category: '',
        category2: '5',
      });
    } else {
      setFormState({
        id: '',
        english: '',
        base: '',
        translation: '',
        example: '',
        img: 'none',
        gender: '',
      });
    }
  };

  const memoizedClearForm = useCallback(clearForm, []);

  useEffect(() => {
    if (actionSuccess.completed === true) {
      memoizedClearForm();
    }
  }, [actionSuccess, memoizedClearForm]);

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/nouns/${itemId}?lang=${lang}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const handleTranslation = (e) => {
    const rExpDer = /\bder\s/i;
    const rExpDie = /\bdie\s/i;
    const rExpDas = /\bdas\s/i;
    const rExpDe = /\bde\s/i;
    const rExpHet = /\bhet\s/i;
    let itemGender;

    if (rExpDer.test(e.target.value)) {
      itemGender = 1;
    } else if (rExpDie.test(e.target.value)) {
      itemGender = 2;
    } else if (rExpDas.test(e.target.value) || rExpHet.test(e.target.value)) {
      itemGender = 3;
    } else if (rExpDe.test(e.target.value)) {
      itemGender = 5;
    }

    setFormState({
      translation: e.target.value,
      base: e.target.value
        .replace(/\bder\s|\bdie\s|\bdas\s|\bde\s|\bhet\s/i, '')
        .replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, ''),
      gender: itemGender,
    });
  };

  const isValid = () => {
    if (
      formState.english === ''
      || formState.base === ''
      || formState.translation === ''
      || formState.example === ''
      || formState.gender === ''
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
      fetchUrl = `https://phoenixjaymes.com/api/language/nouns?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/nouns/${formState.id}?lang=${lang}`;
    }

    handleSubmit(modifyType, fetchUrl, formState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const langName = us.languages[lang];
  const heading = modifyType === 'update'
    ? `Update ${langName} Nouns`
    : `Add ${langName} Nouns`;
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
  const fetchUrl = `https://phoenixjaymes.com/api/language/nouns?lang=${lang}&cat=`;

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
          label={`Translation - ${formState.base}`}
          name="translation"
          value={formState.translation}
          handleChange={handleTranslation}
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

        <FormSelect
          label="Gender"
          name="gender"
          categories={categories[lang].gender}
          selected={formState.gender}
          handleCategory={handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="noun"
          handleIconClick={handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="translation"
          propNameToolTip="english"
        />
      )}
    </div>
  );
};

Noun.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
  actionSuccess: PropTypes.shape({
    completed: PropTypes.bool,
    type: PropTypes.string,
  }),
};

export default withFormWrap(Noun);
