import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseUrl = 'http://localhost:8080';


const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})


api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('authtoken')

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default api;