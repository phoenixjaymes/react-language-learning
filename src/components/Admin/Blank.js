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

const Blank = ({
  handleSubmit,
  categoryName,
  modifyType,
  fetchUpdatedData,
  updateData,
}) => {
  const initialFormState = {
    itemId: '',
    itemCategory: '',
    itemSentence: '',
    itemAnswer: '',
    itemWords: '',
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
    this.setState({
      itemId: '',
      itemSentence: '',
      itemAnswer: '',
      // itemWords: '',
    });
  };

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/blanks/${itemId}?lang=${lang}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const isValid = () => {
    const {
      itemSentence, itemAnswer, itemWords, itemCategory,
    } = this.state;

    if (
      itemSentence === ''
      || itemAnswer === ''
      || itemWords === ''
      || itemCategory === ''
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
      itemCategory,
      itemAnswer,
      itemWords,
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
      fetchUrl = `https://phoenixjaymes.com/api/language/blanks?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/blanks/${itemId}?lang=${lang}`;
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

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)}
       ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const langName = us.languages[lang];
  const heading = modifyType === 'update'
    ? `Update ${langName} Blanks`
    : `Add ${langName} Blanks`;
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
  const fetchUrl = `https://phoenixjaymes.com/api/language/blanks?lang=${lang}&cat=`;

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        onSubmit={this.handleSubmit}
        onFocus={this.handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <FormSelect
          name="itemCategory"
          label="Category"
          categories={categories.all.generalSentence}
          selected={itemCategory}
          handleCategory={this.handleChange}
        />

        <FormTextarea
          label="Sentence"
          name="itemSentence"
          value={itemSentence}
          handleChange={this.handleChange}
        />

        <FormTextarea
          label="Answer"
          name="itemAnswer"
          value={itemAnswer}
          handleChange={this.handleChange}
        />

        <Umlauts
          className="form-umlauts"
          input-type="word"
          input-field="translation"
        />

        <FormInput
          label="Words"
          name="itemWords"
          value={itemWords}
          handleChange={this.handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />

        {/* <Umlauts
              umlautStyles={umlautStyles}
              handleUmlautClick={this.handleUmlautClick}
            /> */}
      </form>

      {modifyType === 'update' && (
        <UpdateSelector
          categoryType="blank"
          handleIconClick={this.handleIconClick}
          fetchUrl={fetchUrl}
          propNameDisplay="sentence"
          propNameToolTip="answer"
        />
      )}
    </div>
  );
};

Blank.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
};

export default withFormWrap(Blank);
