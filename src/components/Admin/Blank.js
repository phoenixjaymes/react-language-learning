import React, {
  useState, useContext, useReducer, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormSelect from './FormComponents/FormSelect';
import FormInput from './FormComponents/FormInput';
import FormTextarea from './FormComponents/FormTextarea';
import FormMessage from './FormComponents/FormMessage';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Blank = ({
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
    category: '',
    sentence: '',
    answer: '',
    words: '',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { categories, lang, labels } = useContext(LearningContext);
  const { us } = labels;
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

  useEffect(() => {
    if (updateId !== undefined) {
      fetchUpdatedData(`https://phoenixjaymes.com/api/language/blanks/${updateId}?lang=${lang}`);
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
      category: '',
      sentence: '',
      answer: '',
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
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/blanks/${itemId}?lang=${lang}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const isValid = () => {
    if (
      formState.sentence === ''
      || formState.answer === ''
      || formState.words === ''
      || formState.category === ''
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
      fetchUrl = `https://phoenixjaymes.com/api/language/blanks?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/blanks/${formState.id}?lang=${lang}`;
    }

    handleSubmit(modifyType, fetchUrl, formState, initialFormState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)}
       ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const langName = us.languages[lang];
  const heading = modifyType === 'update'
    ? `Update ${langName} Blanks`
    : `Add ${langName} Blanks`;
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
  const fetchUrl = `https://phoenixjaymes.com/api/language/blanks?lang=${lang}&cat=`;

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        onFocus={handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <FormSelect
          name="category"
          label="Category"
          categories={categories.all.generalSentence}
          selected={formState.category}
          handleCategory={handleChange}
        />

        <FormTextarea
          label="Sentence"
          name="sentence"
          value={formState.sentence}
          handleChange={handleChange}
        />

        <FormTextarea
          label="Answer"
          name="answer"
          value={formState.answer}
          handleChange={handleChange}
        />

        <FormInput
          label="Words"
          name="words"
          value={formState.words}
          handleChange={handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="blank"
          handleIconClick={handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="sentence"
          propNameToolTip="answer"
        />
      )}
    </div>
  );
};

Blank.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateId: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
  actionSuccess: PropTypes.bool,
};

export default withFormWrap(Blank);
