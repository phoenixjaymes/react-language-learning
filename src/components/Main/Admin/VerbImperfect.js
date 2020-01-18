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


class VerbImperfect extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    // change url to get pos from props or match objects
    fetch(`http://phoenixjaymes.com/assets/data/language/get-update-item.php?lang=${lang}&pos=imperfect&id=${itemId}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const data = responseData.item;
        this.setState({
          itemId: data.id,
          itemTranslation: data.translation,
          itemExample: data.example,
          itemType: data.type,
          itemIch: data.ich,
          itemDu: data.du,
          itemEr: data.er_sie_es,
          itemWir: data.wir,
          itemIhr: data.ihr,
          itemSie: data.sie_Sie,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  handleConjugateClick = () => {
    const { itemTranslation, itemType } = this.state;
    const [
      ich, du, er, wir, ihr, sie,
    ] = conjugateImperfect(itemTranslation, itemType);
    this.setState({
      itemIch: ich,
      itemDu: du,
      itemEr: er,
      itemWir: wir,
      itemIhr: ihr,
      itemSie: sie,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  isValid = () => {
    const {
      itemExample, itemIch, itemDu, itemEr, itemWir, itemIhr, itemSie,
    } = this.state;

    if (itemExample === ''
      || itemIch === ''
      || itemDu === ''
      || itemEr === ''
      || itemWir === ''
      || itemIhr === ''
      || itemSie === '') {
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
    const {
      itemId, itemExample, itemType,
      itemIch, itemDu, itemEr, itemWir, itemIhr, itemSie,
    } = this.state;
    const fetchUrl = 'http://phoenixjaymes.com/assets/data/language/update-item.php';

    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('id', itemId);
    formData.append('pos', 'imperfect');
    formData.append('example', itemExample);
    formData.append('type', itemType);
    formData.append('ich', itemIch);
    formData.append('du', itemDu);
    formData.append('er_sie_es', itemEr);
    formData.append('wir', itemWir);
    formData.append('ihr', itemIhr);
    formData.append('sie_sie', itemSie);

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
      isDialogShown, dialogMessage, itemTranslation, itemExample, itemType,
      itemIch, itemDu, itemEr, itemWir, itemIhr, itemSie, response, status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const categoryOptions = categories[lang].verb.map((category) => (
      <option key={category.id} value={category.id}>{category.name}</option>
    ));

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    return (
      <div>
        <div className="layout-grid-form">
          <form className="form" autoComplete="off" onSubmit={this.handleSubmit} onFocus={this.handleFocus}>
            <h3 className="form__header">Update German Imperfect</h3>

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

            <Umlauts className="form-umlauts" input-type="verb" input-field="translation" />

            <FormInput
              label="Example"
              name="itemExample"
              value={itemExample}
              handleChange={this.handleChange}
            />

            <button type="button" className="form__conjugate__button" onClick={this.handleConjugateClick}>
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
                  <span className="tool" data-tip="er, sie, es"> ?</span>
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
                  <span className="tool" data-tip="sie &amp; Sie"> ?</span>
                </span>
                )}
              name="itemSie"
              value={itemSie}
              handleChange={this.handleChange}
              pos="verb"
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

VerbImperfect.contextType = LearningContext;

VerbImperfect.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default VerbImperfect;
