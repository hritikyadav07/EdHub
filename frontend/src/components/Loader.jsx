import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Loader({ size = 'md', className = '' }) {
  const { theme } = useTheme();

  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`
          ${sizes[size]}
          border-4 
          ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}
          border-t-primary-600
          rounded-full
        `}
      />
    </div>
  );
}