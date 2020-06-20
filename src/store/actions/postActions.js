const config = require('../../config/config');

export const getAllPostAction = () => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/posts')
      .then(res => res.json())
      .then(posts => dispatch({ type: 'GET_POST_SUCCESS', posts}))
      .catch(err => console.log(err));
  }
}