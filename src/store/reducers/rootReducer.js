import authReducer from './authReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  comments: commentReducer,
  firebase: firebaseReducer
});

export default rootReducer;