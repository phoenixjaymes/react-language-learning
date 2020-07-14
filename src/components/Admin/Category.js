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
    id: '',
    type: 'general',
    category: '',
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
    setFormState({
      category: '',
    });
  };

  const handleIconClick = (e) => {
    const id = e.target.getAttribute('data-id');
    const category = e.target.getAttribute('data-category');
    setFormState({ id, category });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ [name]: value });
  };

  const handleRadio = (itemType) => {
    let temp = 'general';

    if (itemType !== 'general') {
      temp = `general${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}`;
    }

    setFormState({
      type: itemType,
      categoryType: temp,
    });
  };

  const isValid = () => {
    if (formState.category === '' || formState.type === '') {
      return false;
    }
    return true;
  };

  const handleFocus = () => {
    setMessageValues({ message: '', status: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let fetchUrl = '';

    if (!isValid()) {
      setMessageValues({
        message: 'Please fill in all feilds',
        status: 'fail',
      });
      return;
    }

    setMessageValues({ message: '', status: '' });

    if (modifyType === 'add') {
      fetchUrl = 'https://phoenixjaymes.com/api/language/categories';
    } else {
      fetchUrl = `https://phoenixjaymes.com/api/language/categories/${formState.id}`;
    }

    handleSubmit(modifyType, fetchUrl, formState);
  };

  const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} 
      ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

  const heading = modifyType === 'update' ? 'Update Category' : 'Add Category';
  const gridClass = modifyType === 'update' ? styles.formLayoutGrid : '';

  return (
    <div className={gridClass}>
      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        onFocus={handleFocus}
      >
        <h3 className={styles.header}>{heading}</h3>

        <CategoryRadioButtons handleRadio={handleRadio} />

        <FormInput
          label="Name"
          name="itemCategory"
          value={formState.category}
          handleChange={handleChange}
        />

        <button className="form__button" type="submit">{`${btnValue}`}</button>

        <FormMessage messageValues={messageValues} />
      </form>

      {modifyType === 'update' && (
        <UpdateSelectorCategory
          categoryType={formState.categoryType}
          handleIconClick={handleIconClick}
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
