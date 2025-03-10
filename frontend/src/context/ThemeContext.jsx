import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ThemeContext = createContext();

const themes = {
  light: {
    name: 'Light',
    icon: '🌞',
    primary: 'bg-primary-600',
    background: 'bg-gray-100',
    text: 'text-gray-800',
    card: 'bg-white'
  },
  dark: {
    name: 'Dark',
    icon: '🌙',
    primary: 'bg-primary-800',
    background: 'bg-gray-900',
    text: 'text-white',
    card: 'bg-gray-800'
  },
  system: {
    name: 'System',
    icon: '💻',
    primary: 'bg-primary-600',
    background: 'bg-gray-100',
    text: 'text-gray-800',
    card: 'bg-white'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return savedTheme || 'light';
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        return 'light';
      }
    }
    return 'light';
  });

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (theme === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Error setting theme in localStorage:', error);
      }
    }
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast.success(`${themes[newTheme].name} theme activated! ${themes[newTheme].icon}`, {
      style: {
        background: newTheme === 'dark' ? '#1F2937' : '#FFFFFF',
        color: newTheme === 'dark' ? '#FFFFFF' : '#1F2937',
      }
    });
  };

  const setThemeWithToast = (newTheme) => {
    setTheme(newTheme);
    setIsThemeMenuOpen(false);
    toast.success(`${themes[newTheme].name} theme activated! ${themes[newTheme].icon}`, {
      style: {
        background: newTheme === 'dark' ? '#1F2937' : '#FFFFFF',
        color: newTheme === 'dark' ? '#FFFFFF' : '#1F2937',
      }
    });
  };

  const ThemeMenu = () => (
    <AnimatePresence>
      {isThemeMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}
        >
          {Object.entries(themes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setThemeWithToast(key)}
              className={`w-full text-left px-4 py-2 text-sm ${
                theme === key
                  ? 'bg-primary-600 text-white'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {value.icon} {value.name}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      themes: themes[theme],
      isThemeMenuOpen,
      setIsThemeMenuOpen,
      ThemeMenu 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};