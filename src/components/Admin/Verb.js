import React, {
  useState, useContext, useReducer, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import { conjugatePresent } from './conjugateVerbs';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Verb = ({
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
    infinitive: '',
    translation: '',
    example: '',
    type: 'weak',
    separable: 'no',
    reflexive: 'no',
    dative: 'no',
    ich: '',
    du: '',
    er: '',
    wir: '',
    ihr: '',
    sie: '',
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
      const { present } = updateData;
      setFormState({ ...updateData, ...present });
    }
  }, [updateData]);

  const clearForm = () => {
    setFormState({
      id: '',
      english: '',
      infinitive: '',
      translation: '',
      example: '',
      type: 'weak',
      separable: 'no',
      reflexive: 'no',
      dative: 'no',
      ich: '',
      du: '',
      er: '',
      wir: '',
      ihr: '',
      sie: '',
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
    const [ich, du, er, wir, ihr, sie] = conjugatePresent(formState.Translation);
    setFormState({
      ich,
      du,
      er,
      wir,
      ihr,
      sie,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const handleTranslation = (e) => {
    setFormState({
      translation: e.target.value,
      infinitive: e.target.value
        .replace(/·/g, '')
        .replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, '')
        .trim(),
    });
  };

  const handleChangeCheck = (e) => {
    const { name } = e.target;
    const newValue = formState[name] === 'yes' ? 'no' : 'yes';
    setFormState({ [name]: newValue });
  };

  const isValid = () => {
    if (
      formState.english === ''
      || formState.infinitive === ''
      || formState.translation === ''
      || formState.example === ''
      || formState.type === ''
      || formState.ich === ''
      || formState.du === ''
      || formState.er === ''
      || formState.wir === ''
      || formState.ihr === ''
      || formState.sie === ''
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
      fetchUrl = `https://phoenixjaymes.com/api/language/verbs?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/verbs/${formState.id}?lang=${lang}`;
    }

    handleSubmit(modifyType, fetchUrl, formState, initialFormState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const heading = modifyType === 'update' ? 'Update German Verbs' : 'Add German Verbs';
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
  const fetchUrl = `https://phoenixjaymes.com/api/language/verbs?lang=${lang}&range=`;

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={handleFormSubmit}
        onFocus={handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <label className="form__label--check" htmlFor="separable">
          <input
            id="separable"
            name="separable"
            className="form__check"
            type="checkbox"
            checked={formState.separable === 'yes'}
            onChange={handleChangeCheck}
          />
          Separable
        </label>

        <label className="form__label--check" htmlFor="reflexive">
          <input
            id="reflexive"
            name="reflexive"
            className="form__check"
            type="checkbox"
            checked={formState.reflexive === 'yes'}
            onChange={handleChangeCheck}
          />
          Reflexive
        </label>

        <label className="form__label--check" htmlFor="dative">
          <input
            id="dative"
            name="dative"
            className="form__check"
            type="checkbox"
            checked={formState.dative === 'yes'}
            onChange={handleChangeCheck}
          />
          Dative
        </label>

        <div>
          <label className="form__label--check" htmlFor="upVerbTypeMixed">
            <input
              id="upVerbTypeMixed"
              name="type"
              className="form__check"
              type="radio"
              value="mixed"
              checked={formState.type === 'mixed'}
              onChange={handleChange}
            />
            Mixed
          </label>

          <label className="form__label--check" htmlFor="upVerbTypeStrong">
            <input
              id="upVerbTypeStrong"
              name="type"
              className="form__check"
              type="radio"
              value="strong"
              checked={formState.type === 'strong'}
              onChange={handleChange}
            />
            Strong
          </label>

          <label className="form__label--check" htmlFor="upVerbTypeWeak">
            <input
              id="upVerbTypeWeak"
              name="type"
              className="form__check"
              type="radio"
              value="weak"
              checked={formState.type === 'weak'}
              onChange={handleChange}
            />
            Weak
          </label>
        </div>

        <FormInput
          label="English"
          name="english"
          value={formState.english}
          handleChange={handleChange}
        />

        <FormInput
          label={`Translation - ${formState.infinitive}`}
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

        <button
          type="button"
          className="form__conjugate__button"
          onClick={handleConjugateClick}
        >
          Conjugate
        </button>

        <FormInput
          label="ich"
          name="ich"
          value={formState.ich}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="du"
          name="du"
          value={formState.du}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label={
            (
              <span>
                er
                <span className="tool" data-tip="er, sie, es">
                  {' '}
                  ?
                </span>
              </span>
            )
          }
          name="er"
          value={formState.er}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="wir"
          name="wir"
          value={formState.wir}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="ihr"
          name="ihr"
          value={formState.ihr}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label={
            (
              <span>
                Sie
                <span className="tool" data-tip="sie &amp; Sie">
                  {' '}
                  ?
                </span>
              </span>
            )
          }
          name="sie"
          value={formState.sie}
          handleChange={handleChange}
          pos="verb"
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

Verb.propTypes = {
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

export default withFormWrap(Verb);
