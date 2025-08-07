import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check localStorage for existing user session
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
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
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        if (currentUser) {
          localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error saving user to localStorage:", error);
      }
    }
  }, [currentUser]);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.login(credentials);

      if (response.success) {
        const userData = response.data;
        setCurrentUser(userData);
        toast.success("Logged in successfully!");

        // Navigate based on role
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

        return { success: true };
      }
    } catch (error) {
      const message = error.message || "Login failed";
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    try {
      // Transform the data to match backend expectations
      const transformedData = {
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        email: userData.email,
        password: userData.password,
        role: userData.accountType || "student",
      };

      const response = await authAPI.register(transformedData);

      if (response.success) {
        const user = response.data;
        setCurrentUser(user);
        toast.success("Registration successful!");
        navigate("/dashboard");
        return { success: true };
      }
    } catch (error) {
      const message = error.message || "Registration failed";
      toast.error(message);
      return {
        success: false,
        error: message,
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
      localStorage.removeItem("user");
      setCurrentUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      localStorage.removeItem("user");
      setCurrentUser(null);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getMe();
        if (response.success) {
          setCurrentUser(response.data);
        }
      } catch (error) {
        // User not authenticated, clear any stale data
        localStorage.removeItem("user");
        setCurrentUser(null);
      }
    };

    // Only check auth if no user in localStorage
    if (!currentUser) {
      checkAuth();
    }
  }, [currentUser]);

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === "admin";
  };

  // Mock login functions for demo
  const mockAdminLogin = () => {
    setLoading(true);
    try {
      const adminUser = {
        id: 1,
        email: "admin@edhub.com",
        name: "Admin User",
        role: "admin",
        avatar: null,
      };
      console.log("Setting admin user:", adminUser);
      setCurrentUser(adminUser);
      toast.success("Logged in as Admin!");
      console.log("Navigating to /admin");
      navigate("/admin"); // Add navigation to admin route
    } finally {
      setLoading(false);
    }
  };

  const mockStudentLogin = () => {
    setLoading(true);
    try {
      const studentUser = {
        id: 2,
        email: "student@edhub.com",
        name: "Student User",
        role: "student",
        avatar: null,
      };
      console.log("Setting student user:", studentUser);
      setCurrentUser(studentUser);
      toast.success("Logged in as Student!");
      console.log("Navigating to /dashboard");
      navigate("/dashboard"); // Add navigation to student dashboard
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin,
        loading,
        initialCheckDone,
        login,
        register,
        logout,
        mockAdminLogin,
        mockStudentLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
