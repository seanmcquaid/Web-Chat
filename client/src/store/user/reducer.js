import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from './types';

const initialState = {
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action?.userInfo?.token,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    default:
      return { ...state };
  }
};

export default reducer;
