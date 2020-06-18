const config = require('../../config/config');

export const logInUserAction = (user) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      user.email,
      user.password
    )
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err })
    });
  }
}

export const logOutUserAction = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
      });
  } 
}

export const createUserAction = (user) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().createUserWithEmailAndPassword(
      user.email,
      user.password)
      .then((resp) => {
        // Later on use res.user.uid to create a user in mongodb
        return fetch(config.BACKEND_URL + '/users', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({'FIREBASE_ID': resp.user.uid})
        })
      })
      .then(() => {
        dispatch({ type: 'CREATEUSER_SUCCESS' })
      })
      .catch(err => {
        dispatch({ type: 'CREATEUSER_ERROR', err})
      });
  }
}