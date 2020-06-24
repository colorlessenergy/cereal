const initState = {
  posts: [],
  singlePost: {},
  error: ''
}

const postReducer = (state=initState, action) => {
  switch (action.type) {
    case 'GET_POST_SUCCESS':
      return {
        ...state,
        posts: action.posts
      }

    case 'GET_SINGLE_POST_SUCCESS':
      return {
        ...state,
        singlePost: action.post
      }

    case 'GET_SINGLE_POST_ERROR':
      return {
        ...state,
        error: 'error retrieving post. Try again later'
      }

    default:
      return state;
  }
}

export default postReducer;