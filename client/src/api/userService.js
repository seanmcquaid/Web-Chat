import apiClient from './index';

export const login = ({ username, password }, config) =>
  apiClient.post('/users/login', { username, password }, config);

export const register = ({ username, password }, config) =>
  apiClient.post('/users/register', { username, password }, config);

export const getAllUsers = (config) =>
  apiClient.get('/users/getAllUsers', config);

export const addFriend = (name, config) =>
  apiClient.post('/users/addFriend', { name }, config);

export const getUserInfo = (config) =>
  apiClient.get('/users/getUserInfo', config);

export const sendMessage = (messageInfo, config) =>
  apiClient.post('/users/sendMessage', { ...messageInfo }, config);
