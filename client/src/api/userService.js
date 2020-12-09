import apiClient from './index';

export const login = ({ username, password }, config) =>
  apiClient.post('/users/login', { username, password }, config);

export const register = ({ username, password }, config) =>
  apiClient.post('/users/register', { username, password }, config);
