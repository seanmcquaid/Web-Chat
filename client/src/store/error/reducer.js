import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  ADD_FRIEND_ERROR,
  GET_USER_INFO_ERROR,
  LOGOUT_ERROR,
} from './types';

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
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
