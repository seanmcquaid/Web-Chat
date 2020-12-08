import Axios from 'axios';
import * as userService from '../../api/userService';

export const loginAction = (username, password) => (dispatch, getState) => {
  const config = {};
  return userService
    .login(config, { username, password })
    .then(({ data }) => {})
    .catch((err) => {})
    .finally(() => {});
};

export const registerAction = () => (dispatch, getState) => {};
