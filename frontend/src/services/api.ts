import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config';

// Define the error response type
interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Create a more informative error message
    const errorData = error.response?.data as ErrorResponse;
    const errorMessage = errorData?.message || 
                        error.response?.statusText || 
                        error.message || 
                        'An error occurred';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;