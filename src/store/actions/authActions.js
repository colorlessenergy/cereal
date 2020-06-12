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