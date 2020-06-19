import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormSelect from './FormSelect';
import FormInput from './FormInput';
import FormTextarea from './FormComponents/FormTextarea';
import FormMessage from './FormMessage';
import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';

import styles from './forms.module.css';

class Sentence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemSentence: '',
      itemType: '',
      itemCategory: '',
      itemAnswer1: '',
      itemExtraWords: '',
      response: '',
      status: '',
      labelStatement: 'Statement',
      labelTranslation: 'Translation',
      isDialogShown: false,
      dialogMessage: 'Are you sure you want to make this change?',
    };
  }

  clearForm = () => {
    const { modifyType } = this.props;

    if (modifyType === 'update') {
      this.setState({
        itemId: '',
        itemSentence: '',
        itemAnswer1: '',
        itemType: '',
        itemCategory: '',
      });
    } else {
      this.setState({
        itemId: '',
        itemSentence: '',
        itemAnswer1: '',
      });
    }
  };

  setLabels = (id) => {
    if (id === '1') {
      this.setState({
        labelStatement: 'Statement - english',
        labelTranslation: 'Translation',
      });
    } else if (id === '2') {
      this.setState({
        labelStatement: 'Question - english',
        labelTranslation: 'Translation',
      });
    } else if (id === '3') {
      this.setState({
        labelStatement: 'Question - foreign',
        labelTranslation: 'Answer - foreign',
      });
    }
  };

  handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const { lang } = this.context;

    fetch(
      `https://phoenixjaymes.com/assets/data/language/updates?lang=${lang}&pos=sentence&id=${itemId}`,
    )
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const data = responseData.data.item;

        this.setLabels(data.type);
        this.setState({
          itemId: data.id,
          itemSentence: data.sentence,
          itemType: data.type,
          itemCategory: data.category,
          itemAnswer1: data.answer1,
          itemExtraWords: data.extraWords,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleType = (e) => {
    const { value } = e.target;
    this.setLabels(value);
    this.setState({ itemType: value });
  };

  isValid = () => {
    const {
      itemSentence, itemType, itemCategory, itemAnswer1,
    } = this.state;

    if (
      itemSentence === ''
      || itemType === ''
      || itemCategory === ''
      || itemAnswer1 === ''
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
      itemSentence,
      itemType,
      itemCategory,
      itemAnswer1,
      itemExtraWords,
    } = this.state;
    const { modifyType } = this.props;
    let fetchUrl;
    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('pos', 'sentence');
    formData.append('sentence', itemSentence.trim());
    formData.append('type', itemType);
    formData.append('category', itemCategory);
    formData.append('answer1', itemAnswer1.trim());
    formData.append('extra', itemExtraWords.trim());

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
      itemType,
      itemSentence,
      itemAnswer1,
      itemExtraWords,
      itemCategory,
      response,
      labelStatement,
      labelTranslation,
      status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const btnValue = `${modifyType
      .charAt(0)
      .toUpperCase()}${modifyType.substring(1)} ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const langName = us.languages[lang];
    const heading = modifyType === 'update'
      ? `Update ${langName} Sentences`
      : `Add ${langName} Sentences`;
    const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';

    const fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}&cat=`;

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
                name="itemType"
                label="Type"
                categories={categories[lang].sentence_type}
                selected={itemType}
                handleCategory={this.handleType}
              />

              <FormSelect
                name="itemCategory"
                label="Category"
                categories={categories.all.generalSentence}
                selected={itemCategory}
                handleCategory={this.handleChange}
              />
            </div>

            <FormTextarea
              label={labelStatement}
              name="itemSentence"
              value={itemSentence}
              handleChange={this.handleChange}
            />

            <FormTextarea
              label={labelTranslation}
              name="itemAnswer1"
              value={itemAnswer1}
              handleChange={this.handleChange}
            />

            <Umlauts
              className="form-umlauts"
              input-type="word"
              input-field="translation"
            />

            <FormInput
              label="Extra Words"
              name="itemExtraWords"
              value={itemExtraWords}
              handleChange={this.handleChange}
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
              categoryType="sentence_cat"
              handleIconClick={this.handleIconClick}
              fetchUrl={fetchUrl}
              propNameDisplay="answer1"
              propNameToolTip="sentence"
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

Sentence.contextType = LearningContext;

Sentence.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default Sentence;
