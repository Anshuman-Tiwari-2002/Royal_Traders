import { API_BASE_URL } from '@/config';

let isRedirecting = false;
let lastRedirectTime = 0;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const handleResponse = async (response: Response) => {
  if (response.status === 401 && !isRedirecting) {
    const now = Date.now();
    // Prevent rapid redirects within 5 seconds
    if (now - lastRedirectTime > 5000) {
      isRedirecting = true;
      lastRedirectTime = now;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if we're not already on the login page
      if (!window.location.pathname.includes('/login')) {
        // Use history.pushState instead of window.location.href to prevent full page reload
        window.history.pushState({}, '', '/login');
        // Reset redirect state after navigation completes
        setTimeout(() => {
          isRedirecting = false;
        }, 1000);
      } else {
        // Reset immediately if already on login page
        isRedirecting = false;
      }
      
      throw new Error('Session expired');
    }
  }
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'An error occurred');
  }
  
  return response.json();
};

export const api = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`GET ${endpoint} error:`, error);
      throw error;
    }
  },

  post: async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`POST ${endpoint} error:`, error);
      throw error;
    }
  },

  put: async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`PUT ${endpoint} error:`, error);
      throw error;
    }
  },

  delete: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`DELETE ${endpoint} error:`, error);
      throw error;
    }
  },
};