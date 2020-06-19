import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import UpdateSelectorCategory from './UpdateSelectorCategory';
import UpdateSelector from './UpdateSelector';
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
      itemType: 'word',
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
    const itemType = e.target.getAttribute('data-type');
    this.setState({ itemType });

    fetch(`https://phoenixjaymes.com/assets/data/language/updates?pos=category&id=${itemId}&type=${itemType}`)
      .then((reponse) => reponse.json())
      .then((responseData) => {
        const data = responseData.data.item;
        this.setState({
          itemId: data.id,
          itemCategory: data.category,
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

  handleRadio = (itemType) => {
    let temp = 'general';

    if (itemType !== 'word') {
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
      this.setState({ response: 'Please fill in all feilds' });
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
    formData.append('pos', 'category');
    formData.append('categoryType', itemType);
    formData.append('category', itemCategory.trim());

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
        this.setState({
          response: `Error fetching and parsing data, ${error}`,
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
    const fetchUrl = `https://phoenixjaymes.com/api/language/categories?type=`;

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

            <input
              className="form__button"
              type="submit"
              value={`${btnValue}`}
            />

            <FormMessage response={response} status={status} />
          </form>

          {modifyType === 'update' && (
            <UpdateSelector
              categoryType={categoryType}
              handleIconClick={this.handleIconClick}
              fetchUrl={fetchUrl}
              propNameDisplay="name"
              propNameToolTip="name"
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
