import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import { conjugatePerfect } from './conjugateVerbs';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormInput';
import FormMessage from './FormMessage';
import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';

import styles from './forms.module.css';

class VerbPerfect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemTranslation: '-',
      itemPerfect: '',
      itemExample: '',
      itemType: '',
      itemAuxiliary: '',
      itemSeparable: '',
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

    fetch(`https://phoenixjaymes.com/assets/data/language/updates?lang=${lang}&pos=perfect&id=${itemId}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const data = responseData.data.item;
        this.setState({
          itemId: data.id,
          itemTranslation: data.translation,
          itemPerfect: data.perfect,
          itemExample: data.example,
          itemType: data.type,
          itemAuxiliary: data.auxiliary,
          itemSeparable: data.separable,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  handleConjugateClick = () => {
    const { itemTranslation, itemType, itemSeparable } = this.state;

    this.setState({
      itemPerfect: conjugatePerfect(itemTranslation, itemType, itemSeparable),
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  isValid = () => {
    const { itemPerfect, itemExample, itemType, itemAuxiliary } = this.state;

    if (
      itemPerfect === ''
      || itemExample === ''
      || itemType === ''
      || itemAuxiliary === ''
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
      itemPerfect,
      itemExample,
      itemType,
      itemAuxiliary,
    } = this.state;

    const fetchUrl = 'https://phoenixjaymes.com/assets/data/language/update-item.php';
    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('id', itemId);
    formData.append('pos', 'perfect');
    formData.append('perfect', itemPerfect.trim());
    formData.append('example', itemExample.trim());
    formData.append('type', itemType);
    formData.append('auxiliary', itemAuxiliary);

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
      itemPerfect,
      itemExample,
      itemType,
      itemAuxiliary,
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
            <h3 className={styles.header}>Update Dutch Perfect</h3>
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

            <label
              className="form__label--check"
              htmlFor="upPerfectAuxiliaryHaben"
            >
              <input
                id="upPerfectAuxiliaryHaben"
                name="itemAuxiliary"
                className="form__check"
                type="radio"
                value="hebben"
                checked={itemAuxiliary === 'hebben'}
                onChange={this.handleChange}
              />
              Hebben
            </label>

            <label
              className="form__label--check"
              htmlFor="upPerfectAuxiliarySein"
            >
              <input
                id="upPerfectAuxiliarySein"
                name="itemAuxiliary"
                className="form__check"
                type="radio"
                value="zijn"
                checked={itemAuxiliary === 'zijn'}
                onChange={this.handleChange}
              />
              Zijn
            </label>

            <button
              type="button"
              className="form__conjugate__button"
              onClick={this.handleConjugateClick}
            >
              Conjugate
            </button>

            <FormInput
              label="Perfect"
              name="itemPerfect"
              value={itemPerfect}
              handleChange={this.handleChange}
            />

            <FormInput
              label="Example"
              name="itemExample"
              value={itemExample}
              handleChange={this.handleChange}
            />

            <Umlauts
              className="form-umlauts"
              input-type="verb"
              input-field="translation"
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

VerbPerfect.contextType = LearningContext;

VerbPerfect.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default VerbPerfect;
