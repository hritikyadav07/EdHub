import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';

function Login() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const result = await login({
          email: formData.email, 
          password: formData.password,
          rememberMe: formData.rememberMe
        });
        
        if (!result.success) {
          setErrors({ form: result.error || 'Invalid email or password' });
        }
      } catch (error) {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Or{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <Card className="py-8 px-4 sm:px-10">
          {errors.form && (
            <Alert 
              type="error" 
              title="Error"
              className="mb-6"
            >
              {errors.form}
            </Alert>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            
            <div>
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
              />
              <div className="text-right mt-1">
                <Link 
                  to="/forgot-password" 
                  className={`text-sm font-medium ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'} hover:underline`}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className={`h-4 w-4 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'border-gray-300'} rounded`}
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label 
                htmlFor="rememberMe" 
                className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Remember me
              </label>
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;