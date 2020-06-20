import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import { conjugateImperfect } from './conjugateVerbs';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormInput';
import FormMessage from './FormMessage';
import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';

import styles from './forms.module.css';

class VerbImperfect extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          const { imperfect } = data;
          this.setState({
            itemId: data.id,
            itemTranslation: data.translation,
            itemExample: data.example,
            itemType: data.type,
            itemIk: imperfect.ik,
            itemJij: imperfect.jij,
            itemHij: imperfect.hij,
            itemU: imperfect.u,
            itemWij: imperfect.wij,
            itemJullie: imperfect.jullie,
            itemZij: imperfect.zij,
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  isValid = () => {
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
      this.setState({ response: 'Please fill in all feilds' });
      return;
    }

    this.setState({
      isDialogShown: true,
      response: '',
    });
  };

  submitForm = () => {
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
    const fetchUrl = 'https://phoenixjaymes.com/assets/data/language/update-item.php';

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
      body: formData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        this.setState({
          response: `${responseData.status}: ${responseData.data.message}`,
          status: responseData.status,
        });
        if (responseData.status === 'success') {
          this.clearForm();
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
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
      itemTranslation,
      itemExample,
      itemType,
      itemIk,
      itemJij,
      itemHij,
      itemU,
      itemWij,
      itemJullie,
      itemZij,
      response,
      status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;
    const fetchUrl = `https://phoenixjaymes.com/api/language/verbs?lang=${lang}&range=`;

    return (
      <div>
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

            <input
              className="form__button"
              type="submit"
              value={`${btnValue}`}
            />

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

VerbImperfect.contextType = LearningContext;

VerbImperfect.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default VerbImperfect;
