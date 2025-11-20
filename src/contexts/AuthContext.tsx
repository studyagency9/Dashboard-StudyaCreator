import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import { getAdminProfile } from '../services/adminService';
import type { AdminData } from '../types/auth';

interface AuthContextType {
  user: AdminData | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const profile = await getAdminProfile();
          setUser(profile);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          localStorage.removeItem('authToken'); // Invalid token
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
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
