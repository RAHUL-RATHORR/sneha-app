import axios from 'axios';

// Live Laravel API Base URL for Sneha Graphics & Solutions
export const DEFAULT_BASE_URL = 'https://snehagraphicssolutions.com/api';

const apiClient = axios.create({
  baseURL: DEFAULT_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
  },
  transformRequest: [
    (data, headers) => {
      if (data && typeof data === 'object' && !(data instanceof FormData)) {
        const params = new URLSearchParams();
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined && data[key] !== null) {
            params.append(key, data[key]);
          }
        });
        return params.toString();
      }
      return data;
    },
  ],
});

// Utility to update the base URL dynamically if needed
export const setBaseUrl = (url) => {
  if (url) {
    apiClient.defaults.baseURL = url;
  }
};

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const isNetworkErr = error.message === 'Network Error' || error.code === 'ERR_NETWORK';
    const serverMessage = error.response?.data?.message || error.message;

    if (error.response?.status !== 404) {
      console.warn('[API Network Log]:', serverMessage);
    }

    if (isNetworkErr) {
      const networkError = new Error(
        'Network Error: Unable to connect to backend server. Please verify your internet connection or server API URL.'
      );
      networkError.isNetworkError = true;
      return Promise.reject(networkError);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
