import apiClient from './index';

export const login = (config, { username, password }) =>
  apiClient.post('/users/login', { username, password }, config);

export const register = (config, { username, password }) =>
  apiClient.post('/users/register', { username, password }, config);
