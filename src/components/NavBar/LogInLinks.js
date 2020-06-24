import React from 'react';

import { connect } from 'react-redux';
import { logOutUserAction } from '../../store/actions/authActions';
import { Link } from 'react-router-dom'

function LogInLinks (props) {
  return (
    <div>
      <Link to='/create'>Create</Link>
      <button onClick={props.logOutUser}>
        Log out
      </button>
    </div>
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