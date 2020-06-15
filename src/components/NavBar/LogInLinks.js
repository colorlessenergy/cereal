import React from 'react';

import { connect } from 'react-redux';
import { logOutUserAction } from '../../store/actions/authActions';

function LogInLinks (props) {
  return (
    <button onClick={props.logOutUser}>
      Log out
    </button>
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