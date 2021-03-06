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

const Sentence = ({
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
    sentence: '',
    type: '',
    category: '',
    answer1: '',
    extra: '',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { categories, lang, labels } = useContext(LearningContext);
  const { us } = labels;
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });
  const [labelValues, setLabelValues] = useState({
    statement: 'Statement (english)',
    translation: 'Translation',
  });

  useEffect(() => {
    if (updateId !== undefined) {
      fetchUpdatedData(`https://phoenixjaymes.com/api/language/sentences/${updateId}?lang=${lang}`);
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
        sentence: '',
        type: '',
        category: '',
        answer1: '',
      });
    } else {
      setFormState({
        id: '',
        sentence: '',
        answer1: '',
      });
    }
  };

  const memoizedClearForm = useCallback(clearForm, []);

  useEffect(() => {
    if (actionSuccess === true) {
      memoizedClearForm();
    }
  }, [actionSuccess, memoizedClearForm]);

  const setLabels = (id) => {
    if (id === '1') {
      setLabelValues({
        statement: 'Statement (english)',
        translation: 'Translation',
      });
    } else if (id === '2') {
      setLabelValues({
        statement: 'Question (english)',
        translation: 'Translation',
      });
    } else if (id === '3') {
      setLabelValues({
        statement: 'Question (foreign)',
        translation: 'Answer (foreign)',
      });
    }
  };

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/sentences/${itemId}?lang=${lang}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const handleType = (e) => {
    const { value } = e.target;
    setLabels(value);
    setFormState({ type: value });
  };

  const isValid = () => {
    if (
      formState.sentence === ''
      || formState.type === ''
      || formState.category === ''
      || formState.answer1 === ''
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
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences/${formState.id}?lang=${lang}`;
    }

    handleSubmit(modifyType, fetchUrl, formState, initialFormState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
  ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const langName = us.languages[lang];
  const heading = modifyType === 'update'
    ? `Update ${langName} Sentences`
    : `Add ${langName} Sentences`;
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';

  const fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}&cat=`;

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
            name="type"
            label="Type"
            categories={categories[lang].sentence_type}
            selected={formState.type}
            handleCategory={handleType}
          />

          <FormSelect
            name="category"
            label="Category"
            categories={categories.all.generalSentence}
            selected={formState.category}
            handleCategory={handleChange}
          />
        </div>

        <FormTextarea
          label={labelValues.statement}
          name="sentence"
          value={formState.sentence}
          handleChange={handleChange}
        />

        <FormTextarea
          label={labelValues.translation}
          name="answer1"
          value={formState.answer1}
          handleChange={handleChange}
        />

        <FormInput
          label="Extra Words"
          name="extra"
          value={formState.extra}
          handleChange={handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="sentence"
          handleIconClick={handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="answer1"
          propNameToolTip="sentence"
        />
      )}
    </div>
  );
};

Sentence.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateId: PropTypes.string,
  updateData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  fetchUpdatedData: PropTypes.func,
  actionSuccess: PropTypes.bool,
};

export default withFormWrap(Sentence);
