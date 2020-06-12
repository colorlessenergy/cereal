import React, { Component } from 'react'

class Register extends Component {
  render() {
    return (
      <form>
        <label htmlFor="email">
          email:
        </label>
        <input id="email" name="email" type="email"></input>
        <label htmlFor="password">
          password:
        </label>
        <input id="password" name="password" type="password"></input>
      </form>
    )
  }
}

export default Register;
