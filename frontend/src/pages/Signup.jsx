import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Alert from '../components/Alert'

function Signup() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFormSuccess(true);
        // Reset form after successful submission
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } catch {
        setErrors({ form: 'Failed to create account. Please try again.' });
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
            Create your account
          </h2>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <Card className="py-8 px-4 sm:px-10">
          {formSuccess && (
            <Alert 
              type="success" 
              title="Account created successfully!"
              className="mb-6"
            >
              You can now sign in with your credentials.
            </Alert>
          )}
          
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
              label="Username"
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              autoComplete="username"
            />
            
            <Input
              label="Email address"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            
            <Input
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />
            
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
            
            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isSubmitting}
              >
                Sign up
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Signup