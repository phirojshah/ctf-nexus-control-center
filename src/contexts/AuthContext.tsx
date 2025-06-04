
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  emailVerified: boolean;
  approved: boolean;
  isAdmin: boolean;
  score: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ctf_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      console.log('Login attempt:', { email, password });
      
      // Mock user data for demo
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        emailVerified: true,
        approved: email === 'admin@ctf.com' ? true : Math.random() > 0.5,
        isAdmin: email === 'admin@ctf.com',
        score: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('ctf_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      console.log('Register attempt:', { email, username, password });
      
      // Mock registration - user needs email verification
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        username,
        emailVerified: false,
        approved: false,
        isAdmin: false,
        score: 0,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('ctf_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ctf_user');
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // Simulate email verification
      console.log('Email verification:', token);
      
      if (user) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        localStorage.setItem('ctf_user', JSON.stringify(updatedUser));
      }
      return true;
    } catch (error) {
      console.error('Email verification failed:', error);
      return false;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    verifyEmail,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
