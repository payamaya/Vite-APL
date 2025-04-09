import axios from 'axios';

const API_URL = 'https://reqres.in/api/login'; // Fake API

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data.token;
};

export default { login };
