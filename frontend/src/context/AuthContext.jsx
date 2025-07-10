import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check localStorage for existing user session
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(true);
  const navigate = useNavigate();

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        if (currentUser) {
          localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    }
  }, [currentUser]);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - check for admin credentials
      let mockUser;
      if (credentials.email === 'admin@edhub.com') {
        mockUser = {
          id: 1,
          email: 'admin@edhub.com',
          name: 'Admin User',
          role: 'admin',
          avatar: null
        };
      } else {
        mockUser = {
          id: 2,
          email: credentials.email,
          name: 'Student User',
          role: 'student',
          avatar: null
        };
      }
      
      setCurrentUser(mockUser);
      toast.success('Logged in successfully!');
      
      // Navigate based on role
      if (mockUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      
      return { success: true };
    } catch (error) {
      const message = 'Login failed';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now(),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        role: userData.accountType || 'student',
        avatar: null
      };
      
      setCurrentUser(mockUser);
      toast.success('Registration successful!');
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      const message = 'Registration failed';
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
      localStorage.removeItem('user');
      setCurrentUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('user');
      setCurrentUser(null);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  // Mock login functions for demo
  const mockAdminLogin = () => {
    const adminUser = {
      id: 1,
      email: 'admin@edhub.com',
      name: 'Admin User',
      role: 'admin',
      avatar: null
    };
    setCurrentUser(adminUser);
    toast.success('Logged in as Admin!');
  };

  const mockStudentLogin = () => {
    const studentUser = {
      id: 2,
      email: 'student@edhub.com',
      name: 'Student User',
      role: 'student',
      avatar: null
    };
    setCurrentUser(studentUser);
    toast.success('Logged in as Student!');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isAdmin,
      loading,
      initialCheckDone,
      login,
      register,
      logout,
      mockAdminLogin,
      mockStudentLogin
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
