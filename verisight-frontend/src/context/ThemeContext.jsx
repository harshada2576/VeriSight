import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.background = '#0C0C0C';
      document.body.style.color = '#FFFFFF';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = '#FFFFFF';
      document.body.style.color = '#0C0C0C';
    }
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    colors: {
      primaryDark: '#0A1E3F',
      primaryAccent: '#2A6BFF',
      scanGlow: '#35E2FF',
      successMint: '#3BFFB3',
      neutralBlack: '#0C0C0C',
      softGrey: '#D8DDE3',
      white: '#FFFFFF',
      error: '#FF4444',
      warning: '#FFA500',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    borderRadius: {
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
    shadows: {
      sm: '0 2px 8px rgba(42, 107, 255, 0.1)',
      md: '0 4px 16px rgba(42, 107, 255, 0.2)',
      lg: '0 8px 24px rgba(42, 107, 255, 0.3)',
      glow: '0 0 20px rgba(53, 226, 255, 0.5)',
    },
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
