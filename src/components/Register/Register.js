import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUserAction } from '../../store/actions/authActions';

import {Redirect} from 'react-router-dom';

import classes from '../register-login-css/Form.module.css';

class Register extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createUser(this.state);
  }

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) return <Redirect to='/'/>

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className={classes["form__group"]}>
            <label htmlFor="email">
              email:
            </label>
            <input
              className={classes["form__input"]}
              onChange={this.handleChange}
              placeholder="email"
              id="email" name="email" type="email" />
          </div>
          <div className={classes["form__group"]}>
            <label htmlFor="password">
              password:
            </label>
            <input
              className={classes["form__input"]}
              onChange={this.handleChange}
              placeholder="password"
              id="password" name="password" type="password" />
          </div>
          <button
            className={classes["form__button"]}>
            register
        </button>
          <div>
            {authError ? (<p>
              {authError}
            </p>) : (null)}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUserAction(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
