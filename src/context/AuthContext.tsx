import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, BloodGroup } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  register: (name: string, email: string, role: UserRole, phone?: string, bloodGroup?: BloodGroup) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('lifelink_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize with admin account by default or stored user
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('lifelink_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Default initial session: Admin Dr. Evelyn Vance for easy review, or quick switch
          const res = await api.login('admin@lifelink.org', 'admin');
          setUser(res.user);
          setToken(res.token);
          localStorage.setItem('lifelink_user', JSON.stringify(res.user));
          localStorage.setItem('lifelink_token', res.token);
        }
      } catch (err) {
        console.warn('Auto auth error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const res = await api.login(email, role);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('lifelink_user', JSON.stringify(res.user));
      localStorage.setItem('lifelink_token', res.token);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, role: UserRole, phone?: string, bloodGroup?: BloodGroup) => {
    setIsLoading(true);
    try {
      const res = await api.register({ name, email, role, phone, bloodGroup });
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('lifelink_user', JSON.stringify(res.user));
      localStorage.setItem('lifelink_token', res.token);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('lifelink_user');
    localStorage.removeItem('lifelink_token');
  };

  const switchRole = async (targetRole: UserRole) => {
    setIsLoading(true);
    try {
      let email = 'admin@lifelink.org';
      if (targetRole === 'donor') email = 'john.miller@example.com';
      if (targetRole === 'recipient') email = 'marcus.vance@example.com';

      const res = await api.login(email, targetRole);
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('lifelink_user', JSON.stringify(res.user));
      localStorage.setItem('lifelink_token', res.token);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
