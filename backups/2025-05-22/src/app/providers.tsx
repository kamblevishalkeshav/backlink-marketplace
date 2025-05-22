'use client';

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

// Theme context for light/dark mode with improved typing
type ThemeType = 'light' | 'dark';
type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with light theme to avoid hydration issues
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [mounted, setMounted] = useState(false);

  // Function to safely apply theme to document
  const applyTheme = (newTheme: ThemeType) => {
    if (typeof window === 'undefined') return;
    
    // Update the HTML class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    
    // Store in localStorage for persistence
    localStorage.setItem('theme', newTheme);
  };

  // Set theme with safety checks
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Initialize theme on mount - client-side only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get saved theme from localStorage, if available
    const storedTheme = localStorage.getItem('theme') as ThemeType | null;
    const initialTheme = storedTheme === 'dark' ? 'dark' : 'light';
    
    // Set state and apply theme
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    
    // Mark as mounted
    setMounted(true);
  }, []);

  // Only render children when mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  }));

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
} 