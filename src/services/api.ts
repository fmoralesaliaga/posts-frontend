import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Centralized API configuration
 * @module api
 */

/**
 * Base URL for API requests.
 * Uses environment variable if available, otherwise falls back to localhost.
 */
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Axios instance with predefined configuration
 */
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request interceptor
 * Handles authentication and request preparation
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get authentication token if needed
    // const token = localStorage.getItem('auth_token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles response processing and error handling
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Log meaningful error message
    const errorMessage = 
      (error.response?.data as { message?: string })?.message || 
      error.message || 
      'An unknown error occurred';
    
    // Log error for debugging
    console.error('API Error:', errorMessage);
    
    // Handle specific error codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Authentication error: User not authorized');
          // Could redirect to login page or clear credentials
          // store.dispatch(logout());
          break;
        case 403:
          console.log('Acceso prohibido');
          break;
        case 404:
          console.log('Recurso no encontrado');
          break;
        case 500:
          console.log('Error del servidor');
          break;
        default:
          console.log(`Error: ${error.response.status}`);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
