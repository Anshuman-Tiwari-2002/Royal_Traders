import { API_BASE_URL } from '../config';

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : '',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle token expiration
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }

  return response;
}; 