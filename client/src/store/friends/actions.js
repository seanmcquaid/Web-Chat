import Axios from 'axios';
import { addFriend } from '../../api/userService';
import { ADD_FRIEND_ERROR } from '../error/types';
import { ADD_FRIEND_LOADING } from '../loading/types';
import { ADD_FRIEND_SUCCESS } from './types';

export const addFriendAction = (name) => (dispatch, getState) => {
  dispatch({
    type: ADD_FRIEND_LOADING,
  });
  const { token } = getState().user;
  const cancelToken = Axios.CancelToken;
  const source = cancelToken.source();

  const config = {
    headers: {
      authorization: token,
    },
    cancelToken: source.token,
  };

  return addFriend(name, config)
    .then(({ data }) => {
      dispatch({
        type: ADD_FRIEND_SUCCESS,
        friends: data?.friends,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_FRIEND_ERROR,
        error: err,
      });
    });
};

export const deleteFriendAction = (name) => (dispatch, getState) => {};
