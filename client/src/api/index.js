import Axios from 'axios';

const apiClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiClient;
