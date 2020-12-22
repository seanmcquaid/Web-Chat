import { GET_USER_INFO_SUCCESS } from '../user/types';
import { ADD_FRIEND_SUCCESS } from './types';

const initialState = {
  friendsList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        friendsList: [...action?.friends],
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        friendsList: [...action?.userInfo?.friends],
      };
    default:
      return { ...state };
  }
};

export default reducer;
