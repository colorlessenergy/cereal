import React from 'react';

import { connect } from 'react-redux';
import { logOutUserAction } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import classes from './Nav.module.css';


function LogInLinks (props) {
  return (
    <nav className={classes['nav']}>
      <Link
        className={classes["nav__link"]}
        to='/'>Cereal</Link>
      <Link 
        className={classes["nav__link"]}
        to='/create'>Create</Link>
      <button 
        className={classes["nav__link"]}
        onClick={props.logOutUser}>
        Log out
      </button>
    </nav>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => {
      dispatch(logOutUserAction());
    }
  }
}

export default connect(null, mapDispatchToProps)(LogInLinks)