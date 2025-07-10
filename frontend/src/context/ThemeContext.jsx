import { createContext, useContext, useState, useEffect, useRef } from 'react';
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
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return savedTheme;
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        return 'light';
      }
    }
    return 'light';
  });

  const [themePreference, setThemePreference] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return localStorage.getItem('theme') || 'light';
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
      if (themePreference === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('theme', themePreference);
      } catch (error) {
        console.error('Error setting theme in localStorage:', error);
      }
    }
    
    // Apply theme to document with debugging
    console.log('Applying theme:', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to document');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from document');
    }
    
    // Verify class was applied
    console.log('Current document classes:', document.documentElement.classList.toString());
  }, [theme, themePreference]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme);
    
    setTheme(newTheme);
    setThemePreference(newTheme);
    
    // Dismiss any existing theme toasts before showing new one
    toast.dismiss();
    
    toast.success(`${themes[newTheme].name} theme activated! ${themes[newTheme].icon}`, {
      id: 'theme-toggle',
      style: {
        background: newTheme === 'dark' ? '#1F2937' : '#FFFFFF',
        color: newTheme === 'dark' ? '#FFFFFF' : '#1F2937',
      }
    });
  };

  const setThemeWithToast = (newTheme) => {
    console.log('Setting theme with toast to:', newTheme);
    
    setThemePreference(newTheme);
    
    let actualTheme = newTheme;
    if (newTheme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    setTheme(actualTheme);
    setIsThemeMenuOpen(false);
    
    // Dismiss any existing theme toasts before showing new one
    toast.dismiss();
    
    toast.success(`${themes[newTheme].name} theme activated! ${themes[newTheme].icon}`, {
      id: 'theme-menu',
      style: {
        background: actualTheme === 'dark' ? '#1F2937' : '#FFFFFF',
        color: actualTheme === 'dark' ? '#FFFFFF' : '#1F2937',
      }
    });
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isThemeMenuOpen) {
        setIsThemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeMenuOpen]);

  const ThemeMenu = () => (
    <AnimatePresence>
      {isThemeMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}
        >
          {Object.entries(themes).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setThemeWithToast(key)}
              className={`w-full text-left px-4 py-2 text-sm ${
                themePreference === key
                  ? 'bg-blue-600 text-white'
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