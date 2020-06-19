import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormSelect from './FormSelect';
import FormInput from './FormInput';
import FormMessage from './FormMessage';
import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';

import styles from './forms.module.css';

class Noun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemEnglish: '',
      itemBase: '',
      itemTranslation: '',
      itemExample: '',
      itemGender: '',
      itemImage: 'none',
      itemCategory: '',
      itemCategory2: '5',
      response: '',
      status: '',
      isDialogShown: false,
      dialogMessage: 'Are you sure you want to make this change?',
    };
  }

  clearForm = () => {
    const { modifyType } = this.props;

    if (modifyType === 'update') {
      this.setState({
        itemId: '',
        itemEnglish: '',
        itemBase: '',
        itemTranslation: '',
        itemExample: '',
        itemImage: 'none',
        itemGender: '',
        itemCategory: '',
        itemCategory2: '5',
      });
    } else {
      this.setState({
        itemId: '',
        itemEnglish: '',
        itemBase: '',
        itemTranslation: '',
        itemExample: '',
        itemImage: 'none',
        itemGender: '',
      });
    }
  };

  handleIconClick = (e) => {
    const { lang } = this.context;
    const { isUpdateDeleteListVisible } = this.state;
    const itemId = e.target.getAttribute('data-id');
    fetch(`https://phoenixjaymes.com/assets/data/language/updates?lang=${lang}&pos=noun&id=${itemId}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const data = responseData.data.item;
        this.setState({
          itemId: data.id,
          itemEnglish: data.english,
          itemBase: data.base,
          itemTranslation: data.translation,
          itemExample: data.example,
          itemGender: data.gender,
          itemImage: data.image,
          itemCategory: data.category,
          itemCategory2: data.category2,
          isUpdateDeleteListVisible: !isUpdateDeleteListVisible,
          response: '',
          status: '',
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  handleVisibility = () => {
    const { isUpdateDeleteListVisible } = this.state;
    this.setState({ isUpdateDeleteListVisible: !isUpdateDeleteListVisible });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleTranslation = (e) => {
    const rExpDer = /\bder\s/i;
    const rExpDie = /\bdie\s/i;
    const rExpDas = /\bdas\s/i;
    const rExpDe = /\bde\s/i;
    const rExpHet = /\bhet\s/i;
    let itemGender;

    if (rExpDer.test(e.target.value)) {
      itemGender = 1;
    } else if (rExpDie.test(e.target.value)) {
      itemGender = 2;
    } else if (rExpDas.test(e.target.value) || rExpHet.test(e.target.value)) {
      itemGender = 3;
    } else if (rExpDe.test(e.target.value)) {
      itemGender = 5;
    }

    this.setState({
      itemTranslation: e.target.value,
      itemBase: e.target.value
        .replace(/\bder\s|\bdie\s|\bdas\s|\bde\s|\bhet\s/i, '')
        .replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, ''),
      itemGender,
    });
  };

  isValid = () => {
    const {
      itemEnglish,
      itemBase,
      itemTranslation,
      itemExample,
      itemGender,
      itemImage,
      itemCategory,
      itemCategory2,
    } = this.state;

    if (
      itemEnglish === ''
      || itemBase === ''
      || itemTranslation === ''
      || itemExample === ''
      || itemGender === ''
      || itemImage === ''
      || itemCategory === ''
      || itemCategory2 === ''
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
      itemEnglish,
      itemBase,
      itemTranslation,
      itemExample,
      itemGender,
      itemImage,
      itemCategory,
      itemCategory2,
    } = this.state;
    const { modifyType } = this.props;
    let fetchUrl;
    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('pos', 'noun');
    formData.append('english', itemEnglish.trim());
    formData.append('base', itemBase.trim());
    formData.append('translation', itemTranslation.trim());
    formData.append('example', itemExample.trim());
    formData.append('gender', itemGender);
    formData.append('img', itemImage.trim());
    formData.append('category', itemCategory);
    formData.append('category2', itemCategory2);

    if (modifyType === 'add') {
      fetchUrl = 'https://phoenixjaymes.com/assets/data/language/add-item.php';
    } else {
      formData.append('id', itemId);
      fetchUrl = 'https://phoenixjaymes.com/assets/data/language/update-item.php';
    }

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
    const { categories, lang, labels } = this.context;
    const { us } = labels;
    const {
      isDialogShown,
      dialogMessage,
      itemEnglish,
      itemBase,
      itemTranslation,
      itemExample,
      itemGender,
      itemImage,
      itemCategory,
      itemCategory2,
      response,
      status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const langName = us.languages[lang];
    const heading = modifyType === 'update'
      ? `Update ${langName} Nouns`
      : `Add ${langName} Nouns`;
    const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
    const fetchUrl = `https://phoenixjaymes.com/api/language/nouns?lang=${lang}&cat=`;


    return (
      <div>
        <div className={gridClass}>
          <form
            className={styles.form}
            onSubmit={this.handleSubmit}
            onFocus={this.handleFocus}
          >
            <h3 className={styles.header}>{heading}</h3>
            <div className="form__grid-2">
              <FormSelect
                name="itemCategory"
                label="Category 1"
                categories={categories.all.general}
                selected={itemCategory}
                handleCategory={this.handleChange}
              />
              <FormSelect
                name="itemCategory2"
                label="Category 2"
                categories={categories.all.general}
                selected={itemCategory2}
                handleCategory={this.handleChange}
              />
            </div>

            <FormInput
              label="English"
              name="itemEnglish"
              value={itemEnglish}
              handleChange={this.handleChange}
            />

            <FormInput
              label={`Translation - ${itemBase}`}
              name="itemTranslation"
              value={itemTranslation}
              handleChange={this.handleTranslation}
            />

            <Umlauts
              className="form-umlauts"
              input-type="word"
              input-field="translation"
            />

            <FormInput
              label="Example"
              name="itemExample"
              value={itemExample}
              handleChange={this.handleChange}
            />

            <FormInput
              label="Image"
              name="itemImage"
              value={itemImage}
              handleChange={this.handleChange}
            />

            <FormSelect
              label="Gender"
              name="itemGender"
              categories={categories[lang].gender}
              selected={itemGender}
              handleCategory={this.handleChange}
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
              categoryType="noun"
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

Noun.contextType = LearningContext;

Noun.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default Noun;
