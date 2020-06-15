import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInUserAction } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class Login extends Component {

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
    this.props.logInUser(this.state);
  }

  render() {
    const {auth, authError} = this.props;
    if (auth.uid) return <Redirect to='/' />

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">
          email:
        </label>
        <input
          onChange={this.handleChange} 
          id="email" name="email" type="email"></input>
        <label htmlFor="password">
          password:
        </label>
        <input
          onChange={this.handleChange} 
          id="password" name="password" type="password"></input>
        <button>
          login
        </button>
        <div>
          {authError ? (<p>
            {authError}
          </p>) : (null)}
        </div>
      </form>
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
    logInUser: (user) => dispatch(logInUserAction(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
