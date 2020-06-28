import React from 'react';

import { Link } from 'react-router-dom';

import classes from './Nav.module.css';

function LogOutLinks () {
  return (
    <nav>
      <Link 
        className={classes["nav__link"]}
        to="/login">login</Link>
      <Link
        className={classes["nav__link"]}
        to="/register">register</Link>
    </nav>
  )
}

export default LogOutLinks;