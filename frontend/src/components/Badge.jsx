import { useTheme } from '../context/ThemeContext';

const variants = {
  primary: {
    light: 'bg-primary-100 text-primary-800',
    dark: 'bg-primary-900 text-primary-100',
  },
  success: {
    light: 'bg-green-100 text-green-800',
    dark: 'bg-green-900 text-green-100',
  },
  warning: {
    light: 'bg-yellow-100 text-yellow-800',
    dark: 'bg-yellow-900 text-yellow-100',
  },
  danger: {
    light: 'bg-red-100 text-red-800',
    dark: 'bg-red-900 text-red-100',
  },
  info: {
    light: 'bg-blue-100 text-blue-800',
    dark: 'bg-blue-900 text-blue-100',
  },
};

export default function Badge({
  children,
  variant = 'primary',
  className = '',
}) {
  const { theme } = useTheme();
  const currentVariant = variants[variant][theme === 'dark' ? 'dark' : 'light'];

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 
        rounded-full text-xs font-medium
        ${currentVariant}
        ${className}
      `}
    >
      {children}
    </span>
  );
}