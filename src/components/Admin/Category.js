import React, {
  useState, useContext, useReducer, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../Context';

import UpdateSelectorCategory from './UpdateSelectorCategory';
import FormInput from './FormComponents/FormInput';
import FormMessage from './FormComponents/FormMessage';
import CategoryRadioButtons from './FormComponents/CategoryRadioButtons';

import withFormWrap from './withFormWrap';

import styles from './forms.module.css';

const Category = ({
  handleSubmit,
  categoryName,
  modifyType,
  fetchUpdatedData,
  updateData,
}) => {
  const initialFormState = {
    itemId: '',
    itemType: 'general',
    itemCategory: '',
    categoryType: 'general',
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const { categories, lang, labels } = useContext(LearningContext);
  const { us } = labels;
  const [formState, setFormState] = useReducer(reducer, initialFormState);
  const [messageValues, setMessageValues] = useState({ message: '', status: '' });

  // useEffect(() => {
  //   setFormState(updateData);
  // }, [updateData]);

  const clearForm = () => {
    this.setState({ itemCategory: '' });
  };


  const handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const itemCategory = e.target.getAttribute('data-category');
    this.setState({ itemId, itemCategory });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const handleRadio = (itemType) => {
    let temp = 'general';

    if (itemType !== 'general') {
      temp = `general${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`;
    }

    this.setState({
      itemType,
      categoryType: temp,
    });
  };

  const isValid = () => {
    const { itemType, itemCategory } = this.state;

    if (itemCategory === '' || itemType === '') {
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
    const { modifyType } = this.props;
    const { itemId, itemType, itemCategory } = this.state;
    let fetchUrl;
    const formData = new FormData();
    // formData.append('pos', 'category');
    formData.append('type', itemType);
    formData.append('name', itemCategory.trim().toLowerCase());

    if (modifyType === 'add') {
      fetchUrl = 'https://phoenixjaymes.com/api/language/categories';
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/categories/${itemId}`;
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

  const heading = modifyType === 'update' ? 'Update Category' : 'Add Category';
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        onSubmit={this.handleSubmit}
        onFocus={this.handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <CategoryRadioButtons handleRadio={this.handleRadio} />

        <FormInput
          label="Name"
          name="itemCategory"
          value={itemCategory}
          handleChange={this.handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelectorCategory
          categoryType={categoryType}
          handleIconClick={this.handleIconClick}
        />
      )}
    </div>
  );
};

Category.propTypes = {
  handleSubmit: PropTypes.func,
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
  updateData: PropTypes.objectOf(PropTypes.string),
  fetchUpdatedData: PropTypes.func,
};

export default withFormWrap(Category);
