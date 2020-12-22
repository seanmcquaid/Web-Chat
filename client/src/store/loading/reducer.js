import {
  ADD_FRIEND_ERROR,
  GET_USER_INFO_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  REGISTER_ERROR,
} from '../error/types';
import { ADD_FRIEND_SUCCESS } from '../friends/types';
import {
  GET_USER_INFO_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../user/types';
import {
  ADD_FRIEND_LOADING,
  GET_USER_INFO_LOADING,
  LOGIN_LOADING,
  LOGOUT_LOADING,
  REGISTER_LOADING,
} from './types';

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
    case REGISTER_LOADING:
    case ADD_FRIEND_LOADING:
    case LOGOUT_LOADING:
    case GET_USER_INFO_LOADING:
      return {
        isLoading: true,
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case ADD_FRIEND_ERROR:
    case GET_USER_INFO_ERROR:
    case LOGOUT_ERROR:
      return {
        isLoading: false,
      };
    case ADD_FRIEND_SUCCESS:
    case GET_USER_INFO_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return {
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
