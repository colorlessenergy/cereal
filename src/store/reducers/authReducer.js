const initState = {
  authError: null
}

const authReducer = (state=initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login Failed'
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
      }

    case 'LOGOUT_SUCCESS':
      return state;

    case 'CREATEUSER_SUCCESS':
      return {
        ...state,
        authError: null
      }

    case 'CREATEUSER_ERROR':
      return {
        ...state,
        authError: action.err.message
      }

      default:
        return state;
  }
}

export default authReducer;