import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LearningContext } from '../Context';

import '../../css/forms.css';
import '../../css/login.css';

class LoginForm extends Component {
  state = {
    itemLearner: '',
    itemPass: '',
  }

  handleLearner = e => this.setState({ itemLearner: e.target.value })

  handlePass = e => this.setState({ itemPass: e.target.value })

  handleSubmit = (e) => {
    e.preventDefault();
    const { actions, lang } = this.context;
    const { itemLearner, itemPass } = this.state;
    const { history } = this.props;
    const formData = new FormData();
    formData.append('learner', itemLearner);
    formData.append('password', itemPass);

    fetch('http://phoenixjaymes.com/lab/flashcards/assets/inc/fc-login.php', {
      method: 'POST',
      body: formData,
    })
      .then(reponse => reponse.json())
      .then((responseData) => {
        if (responseData.success === true) {
          actions.setLogin(true);

          // Set session storage
          sessionStorage.setItem('isLoggedIn', true);
          const newPath = `/${lang}/admin`;
          history.push(newPath);
        } else {
          actions.setLogin(false);
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    const { itemLearner, itemPass } = this.state;
    return (
      <div className="login-contanier">
        <form className="form" onSubmit={this.handleSubmit}>
          <h3 className="form__header">Please Login</h3>

          <label className="form__label login-form__label" htmlFor="txtLearner">
            User
            <input
              id="txtLearner"
              className="form__input"
              type="text"
              value={itemLearner}
              onChange={this.handleLearner}
            />
          </label>

          <label className="form__label login-form__label" htmlFor="txtPassword">
            Password
            <input
              id="txtPassword"
              className="form__input"
              type="password"
              value={itemPass}
              onChange={this.handlePass}
            />
          </label>

          <button type="submit" className="form__button">Login</button>
        </form>
      </div>
    );
  }
}

LoginForm.contextType = LearningContext;

LoginForm.propTypes = {
  history: PropTypes.shape(),
};

export default withRouter(LoginForm);
