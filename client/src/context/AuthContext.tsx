import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token: newToken, user: loggedInUser } = response.data;

      setToken(newToken);
      setUser(loggedInUser);

      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      toast.success('Logged in successfully!');

    } catch (err: any) {
      console.error('Login failed', err);
      toast.error(err.response?.data?.error || 'Login failed. Please try again.');
      throw new Error('Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });
      const { token: newToken, user: registeredUser } = response.data;

      setToken(newToken);
      setUser(registeredUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      
      toast.success('Registration successful!');

    } catch (err: any) {
      console.error('Registration failed', err);
      toast.error(err.response?.data?.error || 'Registration failed.');
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    delete axios.defaults.headers.common['Authorization'];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    toast.success('Logged out.');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
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
