
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email && password) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '123',
          name: 'John Doe',
          email: email,
          isLoggedIn: true
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Successfully logged in');
        return true;
      }
      toast.error('Invalid credentials');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      if (name && email && password) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Registration successful! Please log in.');
        return true;
      }
      toast.error('Please fill all required fields');
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
      return false;
    }
  };
  
  const socialLogin = async (provider: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: `${provider.toLowerCase()}-123`,
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.example.com`,
        isLoggedIn: true
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success(`Successfully logged in with ${provider}`);
      return true;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`${provider} login failed`);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      socialLogin,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
