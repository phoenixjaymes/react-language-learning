import React, {
  useState, useContext, useReducer, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormSelect from './FormComponents/FormSelect';
import FormInput from './FormComponents/FormInput';
import FormTextarea from './FormComponents/FormTextarea';
import FormMessage from './FormComponents/FormMessage';
import Umlauts from './Umlauts';

import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Sentence = ({
  handleSubmit,
  categoryName,
  modifyType,
  fetchUpdatedData,
  updateData,
}) => {
  const initialFormState = {
    itemId: '',
    itemSentence: '',
    itemType: '',
    itemCategory: '',
    itemAnswer1: '',
    itemExtraWords: '',
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

  const setLabels = (id) => {
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

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/sentences/${itemId}?lang=${lang}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const handleType = (e) => {
    const { value } = e.target;
    this.setLabels(value);
    this.setState({ itemType: value });
  };

  const isValid = () => {
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
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/sentences/${itemId}?lang=${lang}`;
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

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="sentence"
          handleIconClick={this.handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="answer1"
          propNameToolTip="sentence"
        />
      )}
    </div>
  );
};

Sentence.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
};

export default withFormWrap(Sentence);
