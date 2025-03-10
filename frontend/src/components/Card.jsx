import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  animate = true,
  ...props 
}) {
  const { theme } = useTheme();

  const cardClass = `
    ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
    rounded-lg shadow-card
    ${hover ? 'hover:shadow-card-hover transition-shadow duration-300' : ''}
    ${className}
  `;

  return animate ? (
    <motion.div
      className={cardClass}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  ) : (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
}