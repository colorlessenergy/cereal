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

export const createPostAction = (data, history) => {
  return (dispatch) => {
    fetch(config.BACKEND_URL + '/posts', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 400) {
        return dispatch({ type: 'CREATE_POST_ERROR', err: 'Missing Content' })
      }

      // the .then has to be here
      // because the return statement creates a new promise
      // that is sent down the .then chain
      return res.json().then(post => {
        history.push('/cereal/' + post._id);
        dispatch({ type: 'CREATE_POST_SUCCESS' })
      })
    })
    .catch(err => dispatch({ type: 'CREATE_POST_ERROR', err}))
  }
}