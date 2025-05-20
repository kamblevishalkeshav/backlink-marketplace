'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export function useAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user;

  useEffect(() => {
    // Clear error when auth status changes
    setError(null);
  }, [status]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });
      
      if (result?.error) {
        setError(result.error);
        return false;
      }
      
      router.push('/dashboard');
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call to your registration endpoint
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // Mocked successful registration
      const mockSuccess = true;
      
      if (!mockSuccess) {
        setError('Registration failed');
        return false;
      }
      
      // Auto login after registration
      return await login({
        email: data.email,
        password: data.password,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  }, [login]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await signOut({ redirect: false });
      router.push('/login');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Logout failed');
    } finally {
      setLoading(false);
    }
  }, [router]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loading,
    error,
    login,
    register,
    logout,
  };
} 