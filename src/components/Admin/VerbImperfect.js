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
    itemIch: '',
    itemDu: '',
    itemEr: '',
    itemWir: '',
    itemIhr: '',
    itemSie: '',
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
    const [ich, du, er, wir, ihr, sie] = conjugateImperfect(
      itemTranslation,
      itemType,
    );
    this.setState({
      itemIch: ich,
      itemDu: du,
      itemEr: er,
      itemWir: wir,
      itemIhr: ihr,
      itemSie: sie,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const isValid = () => {
    const {
      itemExample,
      itemIch,
      itemDu,
      itemEr,
      itemWir,
      itemIhr,
      itemSie,
    } = this.state;

    if (
      itemExample === ''
      || itemIch === ''
      || itemDu === ''
      || itemEr === ''
      || itemWir === ''
      || itemIhr === ''
      || itemSie === ''
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
      itemIch,
      itemDu,
      itemEr,
      itemWir,
      itemIhr,
      itemSie,
    } = this.state;
    const fetchUrl = `https://phoenixjaymes.com/api/language/verbs/${itemId}?lang=${lang}&tense=imperfect`;

    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('id', itemId);
    formData.append('pos', 'imperfect');
    formData.append('example', itemExample.trim());
    formData.append('type', itemType);
    formData.append('ich', itemIch.trim());
    formData.append('du', itemDu.trim());
    formData.append('er', itemEr.trim());
    formData.append('wir', itemWir.trim());
    formData.append('ihr', itemIhr.trim());
    formData.append('sie', itemSie.trim());

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
        <h3 className={styles.header}>Update German Imperfect</h3>

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
          label="ich"
          name="itemIch"
          value={itemIch}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="du"
          name="itemDu"
          value={itemDu}
          handleChange={this.handleChange}
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
          name="itemEr"
          value={itemEr}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="wir"
          name="itemWir"
          value={itemWir}
          handleChange={this.handleChange}
          pos="verb"
        />

        <FormInput
          label="ihr"
          name="itemIhr"
          value={itemIhr}
          handleChange={this.handleChange}
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
          name="itemSie"
          value={itemSie}
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
