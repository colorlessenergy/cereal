import authReducer from './authReducer';
import postReducer from './postReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  firebase: firebaseReducer
});

export default rootReducer;