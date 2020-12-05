import Axios from 'axios';

const apiClient = Axios.create(process.env.REACT_APP_API_URL);

export default apiClient;
