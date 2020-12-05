import apiClient from './index';

export const login = (config, { username, password }) =>
  apiClient.post('/users/login', { username, password }, config);
