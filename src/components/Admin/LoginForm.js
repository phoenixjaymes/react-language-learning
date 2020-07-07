import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LearningContext } from '../Context';

import FormInput from './FormComponents/FormInput';

import styles from './forms.module.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemUser: '',
      itemPass: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { actions } = this.context;
    const { itemUser, itemPass } = this.state;
    const { history } = this.props;
    const formData = new FormData();
    formData.append('user', itemUser);
    formData.append('password', itemPass);

    fetch('https://phoenixjaymes.com/api/language/login.php', {
      method: 'POST',
      body: formData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.status === 'success') {
          actions.setLogin(true);

          // Set session storage
          sessionStorage.setItem('isLoggedIn', true);
          sessionStorage.setItem('jwt', responseData.data.jwt);
          const newPath = '/admin';
          history.push(newPath);
        } else {
          actions.setLogin(false);
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  };

  render() {
    const { itemUser, itemPass } = this.state;
    return (
      <div className={styles.loginWrap}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h3 className={styles.header}>Please Login</h3>

          <FormInput
            label="User"
            name="itemUser"
            value={itemUser}
            handleChange={this.handleChange}
          />

          <FormInput
            label="Password"
            name="itemPass"
            value={itemPass}
            handleChange={this.handleChange}
            type="password"
          />

          <button type="submit" className="form__button">
            Login
          </button>
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
