import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './types';

const initialState = {
  token: null,
  isOnline: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.userInfo.token,
        isOnline: action.userInfo.isOnline,
      };
    default:
      return state;
  }
};

export default reducer;
