import { GET_USER_INFO_SUCCESS } from '../user/types';

const initialState = {
  messages: [],
  isTyping: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        messages: [...action?.userInfo?.messages],
        isTyping: action?.userInfo?.isTyping,
      };
    default:
      return state;
  }
};

export default reducer;
