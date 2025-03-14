import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/courses" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Dashboard />} />
          <Route path="/instructor/dashboard" element={<Dashboard />} />
          <Route path="/instructor/courses" element={<Dashboard />} />
          <Route path="/instructor/courses/create" element={<Dashboard />} />
          <Route path="/instructor/analytics" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
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
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
