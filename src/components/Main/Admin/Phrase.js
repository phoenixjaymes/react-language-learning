import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

import UpdateSelector from './UpdateSelector';
import FormTextarea from './FormComponents/FormTextarea';
import FormMessage from './FormMessage';
import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';

import styles from './forms.module.css';

class Phrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemEnglish: '',
      itemTranslation: '',
      response: '',
      status: '',
      isDialogShown: false,
      dialogMessage: 'Are you sure you want to make this change?',
    };
  }

  clearForm = () => {
    console.log('clearing form');
  };

  handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const { lang } = this.context;
    fetch(`https://phoenixjaymes.com/api/language/phrases/${itemId}?lang=${lang}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          const data = responseData.data[0];
          this.setState({
            itemId: data.id,
            itemEnglish: data.english,
            itemTranslation: data.translation,
          });
        } else {
          console.log(responseData);
        }
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

  isValid = () => {
    const { itemEnglish, itemTranslation } = this.state;

    if (itemEnglish === '' || itemTranslation === '') {
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
    const { itemId, itemEnglish, itemTranslation } = this.state;
    const { modifyType } = this.props;
    let fetchUrl;
    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('pos', 'phrase');
    formData.append('english', itemEnglish.trim());
    formData.append('translation', itemTranslation.trim());

    if (modifyType === 'add') {
      fetchUrl = `https://phoenixjaymes.com/api/language/phrases?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/phrases/${itemId}?lang=${lang}`;
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
    const { lang, labels } = this.context;
    const { us } = labels;
    const {
      isDialogShown,
      dialogMessage,
      itemEnglish,
      itemTranslation,
      response,
      status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const langName = us.languages[lang];
    const heading = modifyType === 'update'
      ? `Update ${langName} Phrases`
      : `Add ${langName} Phrases`;
    const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
    const fetchUrl = `https://phoenixjaymes.com/api/language/phrases?lang=${lang}&cat=`;

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

            <FormTextarea
              label="English"
              name="itemEnglish"
              value={itemEnglish}
              handleChange={this.handleChange}
            />

            <FormTextarea
              label="Translation"
              name="itemTranslation"
              value={itemTranslation}
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
              categoryType="phrase"
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

Phrase.contextType = LearningContext;

Phrase.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default Phrase;
