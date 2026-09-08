import axios from 'axios';

// TODO: Replace with actual Laravel API URL when provided by user
const BASE_URL = 'https://api.snehagraphics.com/api'; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor (Useful for adding auth tokens later if needed)
apiClient.interceptors.request.use(
  (config) => {
    // const token = await AsyncStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Handle global errors)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Optionally handle global errors like 401 Unauthorized
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
