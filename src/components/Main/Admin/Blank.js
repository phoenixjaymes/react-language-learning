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

class Blank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemCategory: '',
      itemSentence: '',
      itemAnswer: '',
      itemWords: '',
      response: '',
      status: '',
      isDialogShown: false,
      dialogMessage: 'Are you sure you want to make this change?',
    };
  }

  clearForm = () => {
    this.setState({
      itemId: '',
      itemSentence: '',
      itemAnswer: '',
      itemWords: '',
    });
  }

  handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const { lang } = this.context;

    fetch(`http://phoenixjaymes.com/assets/data/language/get-update-item.php?lang=${lang}&pos=blank&id=${itemId}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const data = responseData.item;

        this.setState({
          itemId: data.id,
          itemSentence: data.sentence,
          itemCategory: data.category,
          itemAnswer: data.answer,
          itemWords: data.words,
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

  isValid = () => {
    const {
      itemSentence, itemAnswer, itemWords, itemCategory,
    } = this.state;

    if (itemSentence === ''
      || itemAnswer === ''
      || itemWords === ''
      || itemCategory === '') {
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
      itemId, itemSentence, itemCategory, itemAnswer, itemWords,
    } = this.state;
    const { modifyType } = this.props;
    let fetchUrl;
    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('pos', 'blank');
    formData.append('category', itemCategory);
    formData.append('sentence', itemSentence.trim());
    formData.append('answer', itemAnswer.trim());
    formData.append('words', itemWords.trim());

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
    const { categories, lang, labels } = this.context;
    const { us } = labels;
    const {
      isDialogShown, dialogMessage, itemSentence, itemAnswer, itemWords,
      itemCategory, response, status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const categoryOptions = categories[lang].blank.map((category) => (
      <option key={category.id} value={category.id}>{category.name}</option>
    ));

    const langName = us.languages[lang];
    const heading = modifyType === 'update' ? `Update ${langName} Blanks` : `Add ${langName} Blanks`;
    const gridClass = modifyType === 'update' ? 'layout-grid-form' : '';

    return (
      <div>
        <div className={gridClass}>
          <form className="form" onSubmit={this.handleSubmit} onFocus={this.handleFocus}>
            <h3 className="form__header">{heading}</h3>

            <FormSelect
              name="itemCategory"
              label="Category"
              categories={categories.all.generalSentence}
              selected={itemCategory}
              handleCategory={this.handleChange}
            />

            <label className="form__label" htmlFor="itemSentence">
              Sentence
              <textarea
                id="itemSentence"
                name="itemSentence"
                className="form__textarea"
                ng-focus="umlautFocus(undefined, undefined, 'itemSentence')"
                value={itemSentence}
                onChange={this.handleChange}
              />
            </label>

            <label className="form__label" htmlFor="itemAnswer">
              Answer
              <textarea
                id="itemAnswer"
                name="itemAnswer"
                className="form__textarea"
                ng-focus="umlautFocus('formUpdateSentence', 'answer1', 'itemAnswer')"
                value={itemAnswer}
                onChange={this.handleChange}
              />
            </label>

            <Umlauts className="form-umlauts" input-type="word" input-field="translation" />

            <FormInput
              label="Words"
              name="itemWords"
              value={itemWords}
              handleChange={this.handleChange}
            />

            <input className="form__button" type="submit" value={`${btnValue}`} />

            <FormMessage
              response={response}
              status={status}
            />

            {/* <Umlauts
              umlautStyles={umlautStyles}
              handleUmlautClick={this.handleUmlautClick}
            /> */}
          </form>

          { modifyType === 'update' && (
            <UpdateSelector
              lang={lang}
              type={categoryName}
              categories={categories}
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

Blank.contextType = LearningContext;

Blank.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default Blank;
