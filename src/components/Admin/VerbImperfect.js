import React, {
  useState, useContext, useReducer, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import Conjugate from './Conjugate';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const VerbImperfect = ({
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
    example: '',
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
      const {
        id,
        infinitive,
        type,
        imperfectExample,
        imperfect,
      } = updateData;
      setFormState({
        id,
        infinitive,
        type,
        example: imperfectExample,
        ...imperfect,
      });
    }
  }, [updateData]);

  const clearForm = () => {
    setFormState({
      id: '',
      example: '',
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

  const handleConjugateClick = (conjugation) => {
    setFormState(conjugation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const isValid = () => {
    if (
      formState.example === ''
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

    if (!isValid()) {
      setMessageValues({
        message: 'Please fill in all feilds',
        status: 'fail',
      });
      return;
    }

    setMessageValues({ message: '', status: '' });

    const fetchUrl = `https://phoenixjaymes.com/api/language/verbs/${formState.id}?lang=${lang}&tense=imperfect`;

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
        <h3 className={styles.header}>Update German Imperfect</h3>

        <h3>{formState.translation}</h3>

        <div>
          <p>Infinitive - {formState.infinitive}</p>
          <p>Type - {formState.type}</p>
        </div>

        <FormInput
          label="Example"
          name="example"
          value={formState.example}
          handleChange={handleChange}
        />

        <Conjugate
          infinitive={formState.infinitive}
          lang={lang}
          tense="imperfect"
          handleConjugateClick={handleConjugateClick}
        />

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
          label={(
            <span>
              er
              <span className="tool" data-tip="er, sie, es">
                {' '}
                ?
              </span>
            </span>
          )}
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
          label={(
            <span>
              Sie
              <span className="tool" data-tip="sie &amp; Sie">
                {' '}
                ?
              </span>
            </span>
          )}
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

VerbImperfect.propTypes = {
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

export default withFormWrap(VerbImperfect);
