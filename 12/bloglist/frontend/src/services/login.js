import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/login` : '/api/login';

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginFunction = { login };

export default loginFunction;