import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const variants = {
  success: {
    icon: CheckCircleIcon,
    light: 'bg-green-50 text-green-800 border-green-200',
    dark: 'bg-green-900 bg-opacity-20 text-green-100 border-green-800',
  },
  warning: {
    icon: ExclamationTriangleIcon,
    light: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    dark: 'bg-yellow-900 bg-opacity-20 text-yellow-100 border-yellow-800',
  },
  error: {
    icon: XCircleIcon,
    light: 'bg-red-50 text-red-800 border-red-200',
    dark: 'bg-red-900 bg-opacity-20 text-red-100 border-red-800',
  },
  info: {
    icon: InformationCircleIcon,
    light: 'bg-blue-50 text-blue-800 border-blue-200',
    dark: 'bg-blue-900 bg-opacity-20 text-blue-100 border-blue-800',
  },
};

export default function Alert({
  type = 'info',
  title,
  children,
  className = '',
}) {
  const { theme } = useTheme();
  const currentVariant = variants[type];
  const Icon = currentVariant.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        rounded-lg border p-4
        ${theme === 'dark' ? currentVariant.dark : currentVariant.light}
        ${className}
      `}
    >
      <div className="flex">
        <Icon className="h-5 w-5 mr-3" aria-hidden="true" />
        <div>
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}