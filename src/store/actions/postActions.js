const config = require('../../config/config');

export const getAllPostAction = () => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/posts')
      .then(res => res.json())
      .then(posts => dispatch({ type: 'GET_POST_SUCCESS', posts}))
      .catch(err => console.log(err));
  }
}

export const getSinglePostByIdAction = (id) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/posts/'+ id)
      .then(res => res.json())
      .then(post => dispatch({ type: 'GET_SINGLE_POST_SUCCESS', post}))
      .catch(err => dispatch({ type: 'GET_SINGLE_POST_ERROR'}));
  }
}