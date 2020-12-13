import { LOGIN_LOADING, REGISTER_LOADING } from './types';

const initialState = {
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
    case REGISTER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return {
        ...state,
        isLoading: false,
      };
  }
};

export default reducer;
