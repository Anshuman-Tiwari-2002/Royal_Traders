import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; user: User }>;
  logout: () => void;
  googleLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      console.log('Attempting login with:', { email });
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.user && response.data.token) {
        console.log('Login successful, setting token and user');
        localStorage.setItem('token', response.data.token);
        setAuthToken(response.data.token);
        setUser(response.data.user);
      } else {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response structure from server');
      }
    } catch (err: any) {
      console.error('Login error details:', {
        message: err.message,
        response: err.response,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'An error occurred during login');
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; user: User }> => {
    try {
      setError(null);
      console.log('Attempting registration with:', { name, email });
      const response = await api.post('/auth/register', { name, email, password });
      console.log('Registration response:', response);
      
      if (response.data && response.data.token) {
        console.log('Registration successful, setting token and user');
        localStorage.setItem('token', response.data.token);
        setAuthToken(response.data.token);
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      } else {
        console.error('Invalid registration response structure:', response);
        throw new Error(response.data?.message || 'Registration failed');
      }
    } catch (err: any) {
      console.error('Registration error details:', {
        message: err.message,
        response: err.response,
        status: err.response?.status
      });
      const errorMessage = err.response?.data?.message || 'An error occurred during registration';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 