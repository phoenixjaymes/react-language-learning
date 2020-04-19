import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { LearningContext } from "../../Context";

import FormInput from "./FormInput";

import styles from "./forms.module.css";

class LoginForm extends Component {
  state = {
    itemLearner: "",
    itemPass: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { actions, lang } = this.context;
    const { itemLearner, itemPass } = this.state;
    const { history } = this.props;
    const formData = new FormData();
    formData.append("learner", itemLearner);
    formData.append("password", itemPass);

    fetch("https://phoenixjaymes.com/lab/flashcards/assets/inc/fc-login.php", {
      method: "POST",
      body: formData,
    })
      .then((reponse) => reponse.json())
      .then((responseData) => {
        if (responseData.success === true) {
          actions.setLogin(true);

          // Set session storage
          sessionStorage.setItem("isLoggedIn", true);
          const newPath = `/${lang}/admin`;
          history.push(newPath);
        } else {
          actions.setLogin(false);
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    const { itemLearner, itemPass } = this.state;
    return (
      <div className={styles.loginWrap}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h3 className={styles.header}>Please Login</h3>

          <FormInput
            label="User"
            name="itemLearner"
            value={itemLearner}
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
