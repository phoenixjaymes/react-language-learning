import React, {
  useState, useContext, useReducer, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormSelect from './FormComponents/FormSelect';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import Umlauts from './Umlauts';

import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Noun = ({
  handleSubmit,
  categoryName,
  modifyType,
  fetchUpdatedData,
  updateData,
}) => {
  const initialFormState = {
    itemId: '',
    itemEnglish: '',
    itemBase: '',
    itemTranslation: '',
    itemExample: '',
    itemGender: '',
    itemImage: 'none',
    itemCategory: '',
    itemCategory2: '5',
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

  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    fetchUpdatedData(`https://phoenixjaymes.com/api/language/nouns/${itemId}?lang=${lang}`);
  };

  const handleVisibility = () => {
    const { isUpdateDeleteListVisible } = this.state;
    this.setState({ isUpdateDeleteListVisible: !isUpdateDeleteListVisible });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const handleTranslation = (e) => {
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

  const isValid = () => {
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
      fetchUrl = `https://phoenixjaymes.com/api/language/nouns?lang=${lang}`;
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/nouns/${itemId}?lang=${lang}`;
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
    ? `Update ${langName} Nouns`
    : `Add ${langName} Nouns`;
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';
  const fetchUrl = `https://phoenixjaymes.com/api/language/nouns?lang=${lang}&cat=`;

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

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
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
  );
};

Noun.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
};

export default withFormWrap(Noun);
