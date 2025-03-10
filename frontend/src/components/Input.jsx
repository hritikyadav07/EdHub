import { useTheme } from '../context/ThemeContext';

export default function Input({
  label,
  type = 'text',
  error,
  className = '',
  ...props
}) {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-3 py-2 
          ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}
          border rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}