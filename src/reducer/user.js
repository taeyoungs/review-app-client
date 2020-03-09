import { combineReducers } from 'redux';
import {
  loginApi,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../action/user.js';

const defaultState = {
  isLoggedIn: false,
  fetchingUpdate: false,
  user: {},
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        fetchingUpdate: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        fetchingUpdate: false,
        user: action.result,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        fetchingUpdate: false,
      };
    default:
  }
};

export default combineReducers({
  user: userReducer,
});
