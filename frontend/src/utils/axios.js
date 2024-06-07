import axios from 'axios';
import {getToken} from '../utils/auth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Replace with your API base URL
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // For example, you can add an Authorization header
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // For example, redirect to login page if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;