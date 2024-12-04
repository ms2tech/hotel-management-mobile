import { API_BASE_URL, API_KEY } from '@env'

const API_URL = `${API_BASE_URL}/auth`

export const createAccount = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/create-account`, { name, email, password });
        return response.data.message;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Signup failed');
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data.token;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};