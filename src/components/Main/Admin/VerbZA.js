import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormInput from './FormInput';
import FormMessage from './FormMessage';
import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';

class VerbZA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemEnglish: '',
      itemInfinitive: '',
      itemTranslation: '',
      itemExample: '',
      itemType: 'weak',
      itemSeparable: 'no',
      itemReflexive: 'no',
      response: '',
      status: '',
      isDialogShown: false,
      dialogMessage: 'Are you sure you want to make this change?',
    };
  }

  clearForm = () => {
    console.log('clearing form');
  }

  // Icon click in UpdateSelector
  handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const { lang } = this.context;

    fetch(`http://phoenixjaymes.com/assets/data/language/get-update-item.php?lang=${lang}&pos=verb&id=${itemId}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const data = responseData.item;
        const isSeparableChecked = data.separable;
        const isReflexiveChecked = data.reflexive;
        this.setState({
          itemId: data.id,
          itemEnglish: data.english,
          itemInfinitive: data.infinitive,
          itemTranslation: data.translation,
          itemExample: data.example,
          itemType: data.type,
          itemSeparable: isSeparableChecked,
          itemReflexive: isReflexiveChecked,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleTranslation = (e) => {
    this.setState({
      itemTranslation: e.target.value,
      itemInfinitive: e.target.value.replace(/·/g, '').replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, '').trim(),
    });
  }

  handleSeparable = () => this.setState((prevState) => ({ itemSeparable: prevState.itemSeparable === 'yes' ? 'no' : 'yes' }))

  handleReflexive = () => this.setState((prevState) => ({ itemReflexive: prevState.itemReflexive === 'yes' ? 'no' : 'yes' }))

  isValid = () => {
    const {
      itemEnglish, itemInfinitive, itemTranslation, itemExample, itemType,
    } = this.state;

    if (
      itemEnglish === ''
      || itemInfinitive === ''
      || itemTranslation === ''
      || itemExample === ''
      || itemType === ''
    ) {
      return false;
    }
    return true;
  }

  handleYesClick = () => {
    this.setState({
      isDialogShown: false,
    });
    this.submitForm();
  }

  handleCancelClick = () => {
    this.setState({
      isDialogShown: false,
    });
  }

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
  }

  submitForm = () => {
    const { lang } = this.context;
    let fetchUrl;
    const {
      itemId, itemEnglish, itemInfinitive, itemTranslation, itemExample, itemType, itemSeparable,
      itemReflexive,
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

    if (modifyType === 'add') {
      fetchUrl = 'http://phoenixjaymes.com/assets/data/language/add-item.php';
    } else {
      formData.append('id', itemId);
      fetchUrl = 'http://phoenixjaymes.com/assets/data/language/update-item.php';
    }

    fetch(fetchUrl,
      {
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
  }

  handleFocus = () => {
    this.setState({
      response: '',
      status: '',
    });
  }

  render() {
    const { categories, lang } = this.context;
    const {
      isDialogShown, dialogMessage, itemEnglish, itemInfinitive, itemTranslation, itemExample,
      itemType, itemSeparable, itemReflexive, response, status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const categoryOptions = categories[lang].verb.map((category) => (
      <option key={category.id} value={category.id}>{category.name}</option>
    ));

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const heading = modifyType === 'update' ? 'Update Afrikaans Verbs' : 'Add Afrikaans Verbs';
    const gridClass = modifyType === 'update' ? 'layout-grid-form' : '';

    return (
      <div>
        <div className={gridClass}>
          <form className="form" autoComplete="off" onSubmit={this.handleSubmit} onFocus={this.handleFocus}>
            <h3 className="form__header">{heading}</h3>

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

            <Umlauts className="form-umlauts" input-type="verb" input-field="translation" />

            <FormInput
              label="Example"
              name="itemExample"
              value={itemExample}
              handleChange={this.handleChange}
            />

            <input className="form__button" type="submit" value={`${btnValue}`} />

            <FormMessage
              response={response}
              status={status}
            />
          </form>

          { modifyType === 'update' && (
            <UpdateSelector
              lang={lang}
              type={categoryName}
              categories={categories[lang].verb}
              handleIconClick={this.handleIconClick}
            >
              <select id="selCategoryList" className="form__select" name="selCategoryList">
                <option value="0">Select</option>
                {categoryOptions}
              </select>
            </UpdateSelector>
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

VerbZA.contextType = LearningContext;

VerbZA.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default VerbZA;
