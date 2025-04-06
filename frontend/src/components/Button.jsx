import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Loader from './Loader';

const variants = {
  primary: {
    light: 'bg-primary-600 text-white hover:bg-primary-700',
    dark: 'bg-primary-600 text-white hover:bg-primary-700'
  },
  secondary: {
    light: 'bg-secondary-600 text-white hover:bg-secondary-700',
    dark: 'bg-secondary-600 text-white hover:bg-secondary-700'
  },
  success: {
    light: 'bg-green-600 text-white hover:bg-green-700',
    dark: 'bg-green-600 text-white hover:bg-green-700'
  },
  danger: {
    light: 'bg-red-600 text-white hover:bg-red-700',
    dark: 'bg-red-600 text-white hover:bg-red-700'
  },
  warning: {
    light: 'bg-yellow-500 text-white hover:bg-yellow-600',
    dark: 'bg-yellow-500 text-white hover:bg-yellow-600'
  },
  info: {
    light: 'bg-blue-500 text-white hover:bg-blue-600',
    dark: 'bg-blue-500 text-white hover:bg-blue-600'
  },
  outline: {
    light: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    dark: 'border border-gray-600 text-gray-200 bg-transparent hover:bg-gray-800'
  }
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
  xl: 'px-6 py-3.5 text-base'
};

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const { theme } = useTheme();
  const currentVariant = variants[variant] || variants.primary;
  const currentSize = sizes[size] || sizes.md;

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`
        ${currentVariant[theme === 'dark' ? 'dark' : 'light']}
        ${currentSize}
        font-medium rounded-md
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${theme === 'dark' ? 'focus:ring-offset-gray-900' : ''}
        focus:ring-primary-500
        ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''}
        flex items-center justify-center
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader size="sm" className="mr-2" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}