import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const variants = {
  primary: {
    base: 'bg-primary-600 text-white',
    hover: 'hover:bg-primary-700',
    active: 'active:bg-primary-800',
  },
  secondary: {
    base: 'bg-gray-200 text-gray-800',
    hover: 'hover:bg-gray-300',
    active: 'active:bg-gray-400',
    dark: 'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
  },
  outline: {
    base: 'border-2 border-primary-600 text-primary-600',
    hover: 'hover:bg-primary-50',
    active: 'active:bg-primary-100',
    dark: 'dark:border-primary-400 dark:text-primary-400 dark:hover:bg-gray-800',
  },
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const { theme } = useTheme();
  const currentVariant = variants[variant];

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${currentVariant.base}
        ${currentVariant.hover}
        ${currentVariant.active}
        ${currentVariant.dark || ''}
        ${sizes[size]}
        rounded-md font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      <span className="flex items-center justify-center">
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </span>
    </motion.button>
  );
}