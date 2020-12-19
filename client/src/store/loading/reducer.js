import {
  ADD_FRIEND_LOADING,
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
      return {
        ...state,
        isLoading: true,
      };
    default:
      return {
        ...initialState,
      };
  }
};

export default reducer;
