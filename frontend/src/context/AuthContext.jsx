import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await authAPI.getCurrentUser();
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
        setInitialCheckDone(true);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authAPI.login(credentials);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        toast.success('Logged in successfully!');
        navigate('/dashboard');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      toast.error(message);
      return { 
        success: false, 
        error: message 
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register(userData);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        toast.success('Registration successful!');
        navigate('/dashboard');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message);
      return { 
        success: false, 
        error: message 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      setCurrentUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout on client side even if API call fails
      localStorage.removeItem('token');
      setCurrentUser(null);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      loading,
      initialCheckDone,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
