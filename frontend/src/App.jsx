import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Main from "./pages/Main"
import Signup from "./pages/Signup"
import Courses from "./pages/Courses"
import CourseDetail from "./pages/CourseDetail"
import Dashboard from "./pages/Dashboard"
import Checkout from "./pages/Checkout"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import { AuthProvider, useAuth } from "./context/AuthContext"

import AdminDashboard from "./pages/AdminDashboard"
import AdminCourses from "./pages/AdminCourses"
import AdminCourseForm from "./pages/AdminCourseForm"
import AdminUsers from "./pages/AdminUsers"
import AdminAnalytics from "./pages/AdminAnalytics"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialCheckDone } = useAuth();
  
  // Show nothing while checking authentication status
  if (!initialCheckDone) return null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Instructor route (assumes role is in user object)
const InstructorRoute = ({ children }) => {
  const { currentUser, initialCheckDone } = useAuth();
  
  if (!initialCheckDone) return null;
  
  if (!currentUser || currentUser.role !== 'instructor') {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Admin route (admin users only)
const AdminRoute = ({ children }) => {
  const { currentUser, initialCheckDone } = useAuth();
  
  if (!initialCheckDone) return null;
  
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Wrapper component that applies theme
const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-800'
    }`}>
      <Navbar />
      <main className="pb-16">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/courses" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/courses" element={
            <AdminRoute>
              <AdminCourses />
            </AdminRoute>
          } />
          <Route path="/admin/courses/create" element={
            <AdminRoute>
              <AdminCourseForm />
            </AdminRoute>
          } />
          <Route path="/admin/courses/edit/:id" element={
            <AdminRoute>
              <AdminCourseForm />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />
          <Route path="/admin/analytics" element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
