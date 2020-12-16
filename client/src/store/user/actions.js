import Axios from 'axios';
import * as userService from '../../api/userService';
import {
  GET_USER_INFO_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from './types';
import {
  GET_USER_INFO_LOADING,
  LOGIN_LOADING,
  REGISTER_LOADING,
} from '../loading/types';
import {
  GET_USER_INFO_ERROR,
  LOGIN_ERROR,
  REGISTER_ERROR,
} from '../error/types';
import apiClient from '../../api';

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

export const getUserInfoAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_USER_INFO_LOADING,
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

  return userService
    .getUserInfo(config)
    .then(({ data }) => {
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        userInfo: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_INFO_ERROR,
        error: err,
      });
    })
    .finally(() => {
      source.cancel();
    });
};
