import { REGISTER_ERROR, LOGIN_ERROR } from './types';

const initialState = {
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        errorMessage: action.error,
      };
    default:
      return {
        ...state,
        errorMessage: '',
      };
  }
};

export default reducer;
