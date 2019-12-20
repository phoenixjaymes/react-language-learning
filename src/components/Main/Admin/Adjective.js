import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LearningContext } from '../../Context';

// Components
import UpdateSelector from './UpdateSelector';
import FormSelect from './FormSelect';
import FormInput from './FormInput';
import FormMessage from './FormMessage';
// import Umlauts from './Umlauts';
import ConfirmDialog from './ConfirmDialog';
// import withUtilities from './withUtilities';

class Adjective extends Component {
  state = {
    itemId: '',
    itemEnglish: '',
    itemTranslation: '',
    itemExample: '',
    itemImage: 'none',
    itemCategory: '',
    itemCategory2: '5',
    response: '',
    status: '',
    isDialogShown: false,
    dialogMessage: 'Are you sure you want to make this change?',
    umlauts: [
      'itemTranslation', 'itemExample',
    ],
    umlautItem: '',
    umlautStyles: {},
  }

  clearForm = () => {
    const { modifyType } = this.props;

    if (modifyType === 'update') {
      this.setState({
        itemId: '',
        itemEnglish: '',
        itemTranslation: '',
        itemExample: '',
        itemImage: 'none',
        itemCategory: '',
        itemCategory2: '',
      });
    } else {
      this.setState({
        itemId: '',
        itemEnglish: '',
        itemTranslation: '',
        itemExample: '',
        itemImage: 'none',
      });
    }
  }

  clearMessage = () => {
    console.log('clearing message');
  }

  handleIconClick = (e) => {
    const itemId = e.target.getAttribute('data-id');
    const { lang } = this.context;
    fetch(`http://phoenixjaymes.com/assets/data/language/get-update-item.php?lang=${lang}&pos=adjective&id=${itemId}`)
      .then(reponse => reponse.json())
      .then((responseData) => {
        const { isUpdateDeleteListVisible } = this.state;
        const data = responseData.item;
        this.setState({
          itemId: data.id,
          itemEnglish: data.english,
          itemTranslation: data.translation,
          itemExample: data.example,
          itemImage: data.image,
          itemCategory: data.category,
          itemCategory2: data.category2,
          isUpdateDeleteListVisible: !isUpdateDeleteListVisible,
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
      itemEnglish, itemTranslation, itemExample, itemImage, itemCategory, itemCategory2,
    } = this.state;

    if (itemEnglish === ''
      || itemTranslation === ''
      || itemExample === ''
      || itemImage === ''
      || itemCategory === ''
      || itemCategory2 === '') {
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
  }

  submitForm = () => {
    const { lang } = this.context;
    const {
      itemId, itemEnglish, itemTranslation, itemExample, itemImage, itemCategory, itemCategory2,
    } = this.state;
    const { modifyType } = this.props;
    let fetchUrl;
    const formData = new FormData();
    formData.append('lang', lang);
    formData.append('pos', 'adjective');
    formData.append('english', itemEnglish);
    formData.append('translation', itemTranslation);
    formData.append('example', itemExample);
    formData.append('img', itemImage);
    formData.append('category', itemCategory);
    formData.append('category2', itemCategory2);

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
      .then(reponse => reponse.json())
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

  // handleFocus = (e) => {
  //   const { umlauts } = this.state;
  //   const umlautItem = e.target.getAttribute('id');

  //   if (e.target.type === 'text' && umlauts.includes(umlautItem)) {
  //     const yPos = e.target.offsetTop + e.target.offsetHeight;
  //     this.setState({
  //       umlautStyles: {
  //         right: `${e.target.offsetLeft}px`,
  //         top: `${yPos}px`,
  //         visibility: 'visible',
  //       },
  //       umlautItem,
  //     });
  //   }
  // }

  // handleBlur = () => {
  //   // this.setState({
  //   //   umlautStyles: {
  //   //     left: '0px',
  //   //     top: '0px',
  //   //     visibility: 'hidden',
  //   //   },
  //   // });
  // }

  handleUmlautClick = (umlautToAdd) => {
    const { umlautItem } = this.props;
    // const obj = {};
    // obj[umlautItem] = umlautToAdd;
    this.setState(prevState => (
      { [umlautItem]: prevState[umlautItem] + umlautToAdd }
    ));
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
      itemCategory, itemCategory2, itemEnglish, itemTranslation, itemExample, itemImage, response,
      isDialogShown, dialogMessage, status,
    } = this.state;
    const { modifyType, categoryName } = this.props;

    // Update category options
    let categoryOptions = [];
    if (modifyType === 'update') {
      categoryOptions = categories[lang].adjective.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ));
    } else {
      categoryOptions = [];
    }

    const btnValue = `${modifyType.charAt(0).toUpperCase()}${modifyType.substring(1)} ${categoryName.charAt(0).toUpperCase()}${categoryName.substring(1)}`;

    const langName = us.languages[lang];
    const heading = modifyType === 'update' ? `Update ${langName} Adjectives` : `Add ${langName} Adjectives`;
    const gridClass = modifyType === 'update' ? 'layout-grid-form' : '';

    return (
      <div>
        <div className={gridClass}>
          <form className="form" onSubmit={this.handleSubmit} onFocus={this.handleFocus}>
            <h3 className="form__header">{heading}</h3>

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
              label="Translation"
              name="itemTranslation"
              value={itemTranslation}
              handleChange={this.handleChange}
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

            <input className="form__button" type="submit" value={`${btnValue}`} />

            <FormMessage
              response={response}
              status={status}
            />
          </form>

          { modifyType === 'update' && (
            <UpdateSelector
              lang={lang}
              type={categoryName}
              categories={categories[lang].adjective}
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

Adjective.contextType = LearningContext;

Adjective.propTypes = {
  categoryName: PropTypes.string,
  modifyType: PropTypes.string,
};

export default Adjective;
