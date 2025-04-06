import React from 'react';
import { useTheme } from '../context/ThemeContext';

const variants = {
  primary: {
    light: 'bg-primary-100 text-primary-800',
    dark: 'bg-primary-900 bg-opacity-30 text-primary-300'
  },
  secondary: {
    light: 'bg-secondary-100 text-secondary-800',
    dark: 'bg-secondary-900 bg-opacity-30 text-secondary-300'
  },
  success: {
    light: 'bg-green-100 text-green-800',
    dark: 'bg-green-900 bg-opacity-30 text-green-300'
  },
  error: {
    light: 'bg-red-100 text-red-800',
    dark: 'bg-red-900 bg-opacity-30 text-red-300'
  },
  warning: {
    light: 'bg-yellow-100 text-yellow-800',
    dark: 'bg-yellow-900 bg-opacity-30 text-yellow-300'
  },
  info: {
    light: 'bg-blue-100 text-blue-800',
    dark: 'bg-blue-900 bg-opacity-30 text-blue-300'
  }
};

export default function Badge({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const { theme } = useTheme();
  const currentVariant = variants[variant] || variants.primary;

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium
        ${currentVariant[theme === 'dark' ? 'dark' : 'light']}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}