import { API_BASE_URL } from '../config';

let isRedirecting = false;

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  // Handle token expiration
  if (response.status === 401 && !isRedirecting) {
    isRedirecting = true;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Only redirect if we're not already on the login page
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
    
    throw new Error('Session expired. Please log in again.');
  }

  return response;
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // If the token is invalid, clear it
    if (!response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}; 