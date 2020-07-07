import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import { conjugatePresent } from './conjugateVerbs';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';

import styles from './forms.module.css';

class Verb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemEnglish: '',
      itemInfinitive: '',
      itemTranslation: '',
      itemExample: '',
      itemType: '',
      itemSeparable: 'no',
      itemReflexive: 'no',
      itemDative: 'no',
      itemIch: '',
      itemDu: '',
      itemEr: '',
      itemWir: '',
      itemIhr: '',
      itemSie: '',
      response: '',
      status: '',
      isDialogShown: false,
      dialogMessage: 'Are you sure you want to make this change?',
    };
  }

  clearForm = () => {
    console.log('clearing form');
  };

  // Icon click in UpdateSelector
  handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const { lang } = this.context;

    fetch(`https://phoenixjaymes.com/api/language/verbs/${itemId}?lang=${lang}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          const data = responseData.data[0];
          const { present } = data;

          this.setState({
            itemId: data.id,
            itemEnglish: data.english,
            itemInfinitive: data.infinitive,
            itemTranslation: data.translation,
            itemExample: data.example,
            itemType: data.type,
            itemSeparable: data.separable,
            itemReflexive: data.reflexive,
            itemIch: present.ich,
            itemDu: present.du,
            itemEr: present.er,
            itemWir: present.wir,
            itemIhr: present.ihr,
            itemSie: present.sie,
          });
        } else {
          console.log(responseData);
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  handleConjugateClick = () => {
    const { itemTranslation } = this.state;
    const [ich, du, er, wir, ihr, sie] = conjugatePresent(itemTranslation);
    this.setState({
      itemIch: ich,
      itemDu: du,
      itemEr: er,
      itemWir: wir,
      itemIhr: ihr,
      itemSie: sie,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleTranslation = (e) => {
    this.setState({
      itemTranslation: e.target.value,
      itemInfinitive: e.target.value
        .replace(/·/g, '')
        .replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, '')
        .trim(),
    });
  };

  handleSeparable = () => this.setState((prevState) => ({
    itemSeparable: prevState.itemSeparable === 'yes' ? 'no' : 'yes',
  }));

  handleReflexive = () => this.setState((prevState) => ({
    itemReflexive: prevState.itemReflexive === 'yes' ? 'no' : 'yes',
  }));

  handleDative = () => this.setState((prevState) => ({
    itemDative: prevState.itemDative === 'yes' ? 'no' : 'yes',
  }));

  isValid = () => {
    const {
      itemEnglish,
      itemInfinitive,
      itemTranslation,
      itemExample,
      itemType,
      itemIch,
      itemDu,
      itemEr,
      itemWir,
      itemIhr,
      itemSie,
    } = this.state;

    if (
      itemEnglish === ''
      || itemInfinitive === ''
      || itemTranslation === ''
      || itemExample === ''
      || itemType === ''
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

  handleYesClick = () => {
    this.setState({
      isDialogShown: false,
    });
    this.submitForm();
  };

  handleCancelClick = () => {
    this.setState({
      isDialogShown: false,
    });
  };

  handleSubmit = (e) => {
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

  submitForm = () => {
    const { lang } = this.context;
    let fetchUrl;
    const {
      itemId,
      itemEnglish,
      itemInfinitive,
      itemTranslation,
      itemExample,
      itemType,
      itemSeparable,
      itemReflexive,
      itemDative,
      itemIch,
      itemDu,
      itemEr,
      itemWir,
      itemIhr,
      itemSie,
    } = this.state;
    const { modifyType } = this.props;

    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('pos', 'verb');
    formData.append('english', itemEnglish.trim());
    formData.append('infinitive', itemInfinitive.trim());
    formData.append('translation', itemTranslation.trim());
    formData.append('example', itemExample.trim());
    formData.append('type', itemType);
    formData.append('separable', itemSeparable);
    formData.append('reflexive', itemReflexive);
    formData.append('dative', itemDative);
    formData.append('ich', itemIch.trim());
    formData.append('du', itemDu.trim());
    formData.append('er', itemEr.trim());
    formData.append('wir', itemWir.trim());
    formData.append('ihr', itemIhr.trim());
    formData.append('sie', itemSie.trim());

    if (modifyType === 'add') {
      fetchUrl = `https://phoenixjaymes.com/api/language/verbs?lang=${lang}`;
    } else {
      formData.append('id', itemId);
      fetchUrl = `https://phoenixjaymes.com/api/language/verbs/${itemId}?lang=${lang}`;
    }

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

  handleFocus = () => {
    this.setState({
      response: '',
      status: '',
    });
  };

  render() {
    const { lang } = this.context;
    const {
      isDialogShown,
      dialogMessage,
      itemEnglish,
      itemInfinitive,
      itemTranslation,
      itemExample,
      itemType,
      itemSeparable,
      itemReflexive,
      itemDative,
      itemIch,
      itemDu,
      itemEr,
      itemWir,
      itemIhr,
      itemSie,
      response,
      status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const heading = modifyType === 'update' ? 'Update German Verbs' : 'Add German Verbs';
    const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
    const fetchUrl = `https://phoenixjaymes.com/api/language/verbs?lang=${lang}&range=`;

    return (
      <div>
        <div className={gridClass}>
          <form
            className={styles.form}
            autoComplete="off"
            onSubmit={this.handleSubmit}
            onFocus={this.handleFocus}
          >
            <h3 className={styles.header}>{heading}</h3>

            <label className="form__label--check" htmlFor="upVerbSeparable">
              <input
                id="upVerbSeparable"
                className="form__check"
                type="checkbox"
                checked={itemSeparable === 'yes'}
                onChange={this.handleSeparable}
              />
              Separable
            </label>

            <label className="form__label--check" htmlFor="upVerbReflexive">
              <input
                id="upVerbReflexive"
                className="form__check"
                type="checkbox"
                checked={itemReflexive === 'yes'}
                onChange={this.handleReflexive}
              />
              Reflexive
            </label>

            <label className="form__label--check" htmlFor="upVerbDative">
              <input
                id="upVerbDative"
                className="form__check"
                type="checkbox"
                checked={itemDative === 'yes'}
                onChange={this.handleDative}
              />
              Dative
            </label>

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

            <FormInput
              label="English"
              name="itemEnglish"
              value={itemEnglish}
              handleChange={this.handleChange}
            />

            <FormInput
              label={`Translation - ${itemInfinitive}`}
              name="itemTranslation"
              value={itemTranslation}
              handleChange={this.handleTranslation}
            />

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
              name="itemSie"
              value={itemSie}
              handleChange={this.handleChange}
              pos="verb"
            />

            <button className="form__button" type="submit">{`${btnValue}`}</button>

            <FormMessage response={response} status={status} />
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

        {isDialogShown === true && (
          <ConfirmDialog
            dialogMessage={dialogMessage}
            handleYesClick={this.handleYesClick}
            handleCancelClick={this.handleCancelClick}
          />
        )}
      </div>
    );
  }
}

Verb.contextType = LearningContext;

Verb.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default Verb;
