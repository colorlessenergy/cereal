const initState = {
  comments: null,
  commentRetreiveError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RETREIVE_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.comments,
        commentsRetreiveError: null
      }
    
    case 'RETRIEVE_COMMENTS_ERROR':
      return {
        ...state,
        commentsRetreiveError: action.err
      }

    case 'CREATE_COMMENTS_SUCCESS':
      return {
        ...state,
        createCommentError: null
      }

    case 'CREATE_COMMENTS_ERROR':
      return {
        ...state,
        createCommentError: action.err
      }

    default:
      return state;
  }
}

export default authReducer;