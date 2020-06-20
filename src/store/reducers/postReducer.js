const initState = {
  posts: []
}

const postReducer = (state=initState, action) => {
  switch (action.type) {
    case 'GET_POST_SUCCESS':
      return {
        ...state,
        posts: action.posts
      }

    default:
      return state;
  }
}

export default postReducer;