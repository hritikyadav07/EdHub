import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Main from "./pages/Main"
import Signup from "./pages/Signup"
import Courses from "./pages/Courses"
import CourseDetail from "./pages/CourseDetail"
import Dashboard from "./pages/Dashboard"
import Checkout from "./pages/Checkout"
import About from "./pages/About"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
