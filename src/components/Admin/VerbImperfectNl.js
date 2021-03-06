import React, {
  useState, useContext, useReducer, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import { conjugateImperfect } from './conjugateVerbs';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const VerbImperfectNL = ({
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
    ik: '',
    jij: '',
    hij: '',
    u: '',
    wij: '',
    jullie: '',
    zij: '',
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
        imperfectExample,
        imperfect,
      } = updateData;
      setFormState({
        id,
        example: imperfectExample,
        ...imperfect,
      });
    }
  }, [updateData]);

  const clearForm = () => {
    setFormState({
      id: '',
      example: '',
      ik: '',
      jij: '',
      hij: '',
      u: '',
      wij: '',
      jullie: '',
      zij: '',
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
    const [ik, jij, hij, u, wij, jullie, zij] = conjugateImperfect(
      formState.translation,
      formState.type,
    );
    setFormState({
      ik,
      jij,
      hij,
      u,
      wij,
      jullie,
      zij,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const isValid = () => {
    if (
      formState.example === ''
      || formState.ik === ''
      || formState.jij === ''
      || formState.hij === ''
      || formState.u === ''
      || formState.wij === ''
      || formState.jullie === ''
      || formState.zij === ''
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
        <h3 className={styles.header}>Update Dutch Imperfect</h3>

        <h3>{formState.translation}</h3>

        <div>
          <p>Infinitive - </p>
          <p>Type - </p>
        </div>

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
          label="ik"
          name="ik"
          value={formState.ik}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="jij"
          name="jij"
          value={formState.jij}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="hij"
          name="hij"
          value={formState.hij}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="u"
          name="u"
          value={formState.u}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="wij"
          name="wij"
          value={formState.wij}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="jullie"
          name="jullie"
          value={formState.jullie}
          handleChange={handleChange}
          pos="verb"
        />

        <FormInput
          label="zij"
          name="zij"
          value={formState.zij}
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

VerbImperfectNL.propTypes = {
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

export default withFormWrap(VerbImperfectNL);
