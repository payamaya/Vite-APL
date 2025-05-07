import axios from 'axios'

const API_URL = 'https://vite-apl-ef1z.vercel.app/' // Fake API

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  return response.data.token
}

export default { login }
