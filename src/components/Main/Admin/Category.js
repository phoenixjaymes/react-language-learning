import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UpdateSelectorCategory from './UpdateSelectorCategory';
import FormInput from './FormInput';
import FormMessage from './FormMessage';
import CategoryRadioButtons from './CategoryRadioButtons';
import ConfirmDialog from './ConfirmDialog';

import styles from './forms.module.css';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: '',
      itemType: 'general',
      itemCategory: '',
      categoryType: 'general',
      response: '',
      status: '',
      isDialogShown: false,
      dialogMessage: 'Are you sure you want to make this change?',
    };
  }

  clearForm = () => {
    this.setState({ itemCategory: '' });
  };

  handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const itemCategory = e.target.getAttribute('data-category');
    this.setState({ itemId, itemCategory });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRadio = (itemType) => {
    let temp = 'general';

    if (itemType !== 'general') {
      temp = `general${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`;
    }

    this.setState({
      itemType,
      categoryType: temp,
    });
  };

  isValid = () => {
    const { itemType, itemCategory } = this.state;

    if (itemCategory === '' || itemType === '') {
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

  submitForm = () => {
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

  handleFocus = () => {
    this.setState({
      response: '',
      status: '',
    });
  };

  render() {
    const {
      isDialogShown,
      dialogMessage,
      categoryType,
      itemCategory,
      response,
      status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const heading = modifyType === 'update' ? 'Update Category' : 'Add Category';
    const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';

    return (
      <div>
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

            <FormMessage response={response} status={status} />
          </form>

          {modifyType === 'update' && (
            <UpdateSelectorCategory
              categoryType={categoryType}
              handleIconClick={this.handleIconClick}
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

Category.propTypes = {
  modifyType: PropTypes.string,
  categoryName: PropTypes.string,
};

export default Category;
