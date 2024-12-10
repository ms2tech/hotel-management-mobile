import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { env } from '../constants'

const API_BASE_URL = env.API_BASE_URL // 'http://10.10.10.119:3000/api'
const API_URL = `${API_BASE_URL}/auth`

console.log('ENV', env)

export const createAccount = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/create-account`, { name, email, password })
        return response
    } catch (error) {
        console.log('Error', error)
        throw new Error(error.response?.data?.error || 'Signup failed')
    }
};

export const authenticate = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password })
        return response
    } catch (error) {
        console.log('Error', error)
        throw new Error(error.response?.data?.error || 'Login failed')
    }
};

export const signInUser = async (user, token) => {

}

export const logOut = async () => {
    await SecureStore.deleteItemAsync('jwtToken')
    await AsyncStorage.removeItem('user')
}

export const getCurrentUser = async () => {
    return {
        email: 'moussasarr490@gmail.com',
        name: "Moussa Sarr"
    }
}