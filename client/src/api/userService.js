import apiClient from './index';

export const login = (headers, { username, password }) => apiClient.post();
