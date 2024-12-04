import axios from 'axios'
import { env } from '../constants'

const API_BASE_URL = env.API_BASE_URL // 'http://10.10.10.119:3000/api'
const API_URL = `${API_BASE_URL}/auth`

export const createAccount = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/create-account`, { name, email, password });
        return response.data.message;
    } catch (error) {
        console.log('Error', error)
        throw new Error(error.response?.data?.error || 'Signup failed');
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data.token;
    } catch (error) {
        console.log('Error', error)
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};