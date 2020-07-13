import React, {
  useState, useContext, useReducer, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import { conjugateImperfect } from './conjugateVerbs';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import Umlauts from './Umlauts';

import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const VerbImperfect = ({
  handleSubmit,
  categoryName,
  modifyType,
  fetchUpdatedData,
  updateData,
}) => {
  const initialFormState = {
    itemId: '',
    itemTranslation: '-',
    itemExample: '',
    itemType: '',
    itemIk: '',
    itemJij: '',
    itemHij: '',
    itemU: '',
    itemWij: '',
    itemJullie: '',
    itemZij: '',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { categories, lang, labels } = useContext(LearningContext);
  const { us } = labels;
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

  useEffect(() => {
    setFormState(updateData);
  }, [updateData]);

  const clearForm = () => {
    console.log('clearing form');
  };

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/verbs/${itemId}?lang=${lang}`);
  };

  const handleConjugateClick = () => {
    const { itemTranslation, itemType } = this.state;
    const [ik, jij, hij, u, wij, jullie, zij] = conjugateImperfect(
      itemTranslation,
      itemType,
    );
    this.setState({
      itemIk: ik,
      itemJij: jij,
      itemHij: hij,
      itemU: u,
      itemWij: wij,
      itemJullie: jullie,
      itemZij: zij,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const isValid = () => {
    const {
      itemExample,
      itemIk,
      itemJij,
      itemHij,
      itemU,
      itemWij,
      itemJullie,
      itemZij,
    } = this.state;

    if (
      itemExample === ''
      || itemIk === ''
      || itemJij === ''
      || itemHij === ''
      || itemU === ''
      || itemWij === ''
      || itemJullie === ''
      || itemZij === ''
    ) {
      return false;
    }
    return true;
  };

  const handleFocus = () => {
    setMessageValues({ message: '', status: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!this.isValid()) {
      this.setState({
        response: 'Please fill in all feilds',
        status: 'fail',
      });
      return;
    }

    this.setState({
      isDialogShown: true,
      response: '',
    });
  };

  const submitForm = () => {
    const { lang } = this.context;
    const {
      itemId,
      itemExample,
      itemType,
      itemIk,
      itemJij,
      itemHij,
      itemU,
      itemWij,
      itemJullie,
      itemZij,
    } = this.state;
    const fetchUrl = `https://phoenixjaymes.com/api/language/verbs/${itemId}?lang=${lang}&tense=imperfect`;

    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('id', itemId);
    formData.append('pos', 'imperfect');
    formData.append('example', itemExample.trim());
    formData.append('type', itemType);
    formData.append('ik', itemIk.trim());
    formData.append('jij', itemJij.trim());
    formData.append('hij', itemHij.trim());
    formData.append('u', itemU.trim());
    formData.append('wij', itemWij.trim());
    formData.append('jullie', itemJullie.trim());
    formData.append('zij', itemZij.trim());

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
      body: formData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          this.clearForm();
          this.setState({ response: `${responseData.status}: ${responseData.data.message}` });
        } else if (responseData.status === 'fail') {
          this.setState({ response: Object.values(responseData.data).join(', ') });
        } else {
          this.setState({ response: `${responseData.status}: ${responseData.data.message}` });
        }
        this.setState({ status: responseData.status });
      })
      .catch((error) => {
        this.setState({
          response: `Error fetching and parsing data, ${error}`,
          status: 'error',
        });
      });
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;
  const fetchUrl = `https://phoenixjaymes.com/api/language/verbs?lang=${lang}&range=`;

  return (
    <div className={styles.formLayoutGrid}>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={this.handleSubmit}
        onFocus={this.handleFocus}
      >
        <h3 className={styles.header}>Update Dutch Imperfect</h3>

        <h3>{itemTranslation}</h3>

        <div>
          <label className="form__label--check" htmlFor="upVerbTypeMixed">
            <input
              id="upVerbTypeMixed"
              name="itemType"
              className="form__check"
              type="radio"
              value="mixed"
              checked={itemType === 'mixed'}
              onChange={this.handleChange}
            />
                Mixed
              </label>

          <label className="form__label--check" htmlFor="upVerbTypeStrong">
            <input
              id="upVerbTypeStrong"
              name="itemType"
              className="form__check"
              type="radio"
              value="strong"
              checked={itemType === 'strong'}
              onChange={this.handleChange}
            />
                Strong
              </label>

          <label className="form__label--check" htmlFor="upVerbTypeWeak">
            <input
              id="upVerbTypeWeak"
              name="itemType"
              className="form__check"
              type="radio"
              value="weak"
              checked={itemType === 'weak'}
              onChange={this.handleChange}
            />
                Weak
              </label>
        </div>
        <Umlauts
          className="form-umlauts"
          input-type="verb"
          input-field="translation"
        />

        <FormInput
          label="Example"
          name="itemExample"
          value={itemExample}
          handleChange={this.handleChange}
        />

        <button
          type="button"
          className="form__conjugate__button"
          onClick={this.handleConjugateClick}
        >
          Conjugate
            </button>

        <FormInput
          label="ik"
          name="itemIk"
          value={itemIk}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="jij"
          name="itemJij"
          value={itemJij}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="hij"
          name="itemHij"
          value={itemHij}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="u"
          name="itemU"
          value={itemU}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="wij"
          name="itemWij"
          value={itemWij}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="jullie"
          name="itemJullie"
          value={itemJullie}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="zij"
          name="itemZij"
          value={itemZij}
          handleChange={this.handleChange}
          pos="verb"
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="range"
          handleIconClick={this.handleIconClick}
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
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
};

export default withFormWrap(VerbImperfect);
