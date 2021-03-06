import React, {
  useState, useContext, useReducer, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import { conjugatePerfect } from './conjugateVerbs';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const VerbPerfectNL = ({
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
    auxiliary: 'hebben',
    translation: '',
    example: '',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { lang } = useContext(LearningContext);
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

  useEffect(() => {
    if (updateId !== undefined) {
      fetchUpdatedData(`https://phoenixjaymes.com/api/language/verbs/${updateId}?lang=${lang}`);
    }
  }, [fetchUpdatedData, updateId, lang]);

  useEffect(() => {
    if (updateData.id !== undefined) {
      const {
        id,
        perfect,
        auxiliary,
        perfectExample,
      } = updateData;
      setFormState({
        id,
        auxiliary,
        translation: perfect,
        example: perfectExample,
      });
    }
  }, [updateData]);

  const clearForm = () => {
    setFormState({
      id: '',
      auxiliary: 'hebben',
      translation: '',
      example: '',
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
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/verbs/${itemId}?lang=${lang}`);
  };

  const handleConjugateClick = () => {
    setFormState({
      itemPerfect: conjugatePerfect(formState.translation, formState.type, formState.separable),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const isValid = () => {
    if (
      formState.perfect === ''
      || formState.example === ''
      || formState.type === ''
      || formState.auxiliary === ''
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

    if (!isValid()) {
      setMessageValues({
        message: 'Please fill in all feilds',
        status: 'fail',
      });
      return;
    }

    setMessageValues({ message: '', status: '' });

    const fetchUrl = `https://phoenixjaymes.com/api/language/verbs/${formState.id}?lang=${lang}&tense=perfect`;

    handleSubmit(modifyType, fetchUrl, formState, initialFormState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;
  const fetchUrl = `https://phoenixjaymes.com/api/language/verbs?lang=${lang}&range=`;

  return (
    <div className={styles.formLayoutGrid}>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={handleFormSubmit}
        onFocus={handleFocus}
      >
        <h3 className={styles.header}>Update Dutch Perfect</h3>

        <div>
          <p>Infinitive - </p>
          <p>Type - </p>
        </div>

        <label
          className="form__label--check"
          htmlFor="upPerfectAuxiliaryHaben"
        >
          <input
            id="upPerfectAuxiliaryHaben"
            name="auxiliary"
            className="form__check"
            type="radio"
            value="hebben"
            checked={formState.auxiliary === 'hebben'}
            onChange={handleChange}
          />
          Hebben
        </label>

        <label
          className="form__label--check"
          htmlFor="upPerfectAuxiliarySein"
        >
          <input
            id="upPerfectAuxiliarySein"
            name="auxiliary"
            className="form__check"
            type="radio"
            value="zijn"
            checked={formState.auxiliary === 'zijn'}
            onChange={handleChange}
          />
          Zijn
        </label>

        <button
          type="button"
          className="form__conjugate__button"
          onClick={handleConjugateClick}
        >
          Conjugate
        </button>

        <FormInput
          label="Perfect"
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

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="range"
          handleIconClick={handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="translation"
          propNameToolTip="english"
        />
      )}
    </div>
  );
};

VerbPerfectNL.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateId: PropTypes.string,
  updateData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  fetchUpdatedData: PropTypes.func,
  actionSuccess: PropTypes.bool,
};

export default withFormWrap(VerbPerfectNL);
