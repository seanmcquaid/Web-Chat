import Axios from 'axios';
import * as userService from '../../api/userService';
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './types';

export const loginAction = (username, password) => (dispatch, getState) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  const cancelToken = Axios.CancelToken;
  const source = cancelToken.source();
  const config = {
    cancelToken: source.token,
  };
  return userService
    .login({ username, password }, config)
    .then(({ data }) => {
      dispatch({
        type: LOGIN_SUCCESS,
        userInfo: data,
      });
      return Promise.resolve();
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_ERROR,
        error: err,
      });
      return Promise.reject();
    })
    .finally(() => {
      source.cancel();
    });
};

export const registerAction = (username, password) => (dispatch, getState) => {
  dispatch({
    type: REGISTER_LOADING,
  });
  const cancelToken = Axios.CancelToken;
  const source = cancelToken.source();
  const config = {
    cancelToken: source.token,
  };
  return userService
    .register({ username, password }, config)
    .then(({ data }) => {
      dispatch({
        type: REGISTER_SUCCESS,
        userInfo: data,
      });
      return Promise.resolve();
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_ERROR,
        error: err,
      });
      return Promise.reject();
    })
    .finally(() => {
      source.cancel();
    });
};
