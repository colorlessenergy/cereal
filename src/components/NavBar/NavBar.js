import React from 'react'


import LogInLinks from './LogInLinks';
import LogOutLinks from './LogOutLinks';
import { connect } from 'react-redux';

function NavBar(props) {
  const { auth } = props;
  return (
    <div>
      { auth.uid ? (
        <LogInLinks />
      ) : (
          <LogOutLinks />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(NavBar);