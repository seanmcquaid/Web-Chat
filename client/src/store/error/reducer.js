import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  ADD_FRIEND_ERROR,
  GET_USER_INFO_ERROR,
  LOGOUT_ERROR,
} from './types';
import { ADD_FRIEND_SUCCESS } from '../friends/types';
import {
  GET_USER_INFO_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../user/types';
import {
  LOGIN_LOADING,
  LOGOUT_LOADING,
  ADD_FRIEND_LOADING,
  GET_USER_INFO_LOADING,
  REGISTER_LOADING,
} from '../loading/types';

const initialState = {
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case ADD_FRIEND_ERROR:
    case GET_USER_INFO_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        errorMessage: action?.error?.response?.data?.errorMessage,
      };
    case ADD_FRIEND_SUCCESS:
    case GET_USER_INFO_SUCCESS:
    case LOGIN_LOADING:
    case REGISTER_LOADING:
    case ADD_FRIEND_LOADING:
    case GET_USER_INFO_LOADING:
    case LOGOUT_LOADING:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
