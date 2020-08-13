const config = require('../../config/config');

export const getAllCommentsForPostAction = (postId) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/comments/' + postId)
      .then(res => res.json())
      .then(comments => dispatch({ type: 'RETREIVE_COMMENTS_SUCCESS', comments }))
      .catch(err => dispatch({ type: 'RETRIEVE_COMMENTS_ERROR', err}));
  }
}

export const createCommentForPostActon = (postId, comment) => {
  return (dispatch) => {
    fetch(config.BACKEND_URL + '/comments/'+postId,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(comment)
      })
      .then(res => {
        if (res.status === 400) {
          return dispatch({ type: 'CREATE_COMMENTS_ERROR', err: 'Missing Content' })
        }

        return res.json().then(comment => {
          dispatch(getAllCommentsForPostAction(postId));
          dispatch({ type: 'CREATE_COMMENTS_SUCCESS' });
        });
      });
  }
}