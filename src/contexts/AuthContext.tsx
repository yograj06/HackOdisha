import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem('eldercare-auth');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string) => {
    localStorage.setItem('eldercare-auth', 'true');
    localStorage.setItem('eldercare-user', email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('eldercare-auth');
    localStorage.removeItem('eldercare-user');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};