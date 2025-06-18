'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '@/lib/api';
import { User } from '@/types/user';
import { TOKEN_KEY } from '@/lib/auth';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
   setUser: (user: User | null) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const userData = await getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  // const login = async (email: string, password: string) => {
  //   const response = await apiLogin(email, password);
  //   localStorage.setItem('token', response.token);
  //   setUser(response.user);
  // };
  const login = async (email: string, password: string): Promise<void> => {
  console.log('useAuth login called with:', email); // Debug log
  
  try {
    const response = await apiLogin(email, password);
    console.log('API login response:', response); // Debug log
    
    if (!response.token || !response.user) {
      throw new Error('Invalid response from server');
    }
    
    localStorage.setItem(TOKEN_KEY, response.token);
    console.log('Token stored:', response.token); // Debug log
    
    setUser(response.user);
    console.log('User state updated:', response.user); // Debug log
    
    // ✅ Don't return the response - function should return void
  } catch (error) {
    console.error('useAuth login error:', error);
    throw error; // Re-throw the error so LoginForm can handle it
  }
};


  const register = async (userData: RegisterData) => {
    const response = await apiRegister(userData);
    localStorage.setItem(TOKEN_KEY, response.token);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading,setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
