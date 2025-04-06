import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.get('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Courses API endpoints
export const courseAPI = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  getInstructorCourses: () => api.get('/courses/instructor'),
};

// Enrollment API endpoints
export const enrollmentAPI = {
  enrollInCourse: (courseId, paymentData) => api.post(`/courses/${courseId}/enroll`, paymentData),
  getEnrolledCourses: () => api.get('/enrollments'),
  updateCourseProgress: (courseId, progress) => api.put(`/courses/${courseId}/progress`, { progress }),
};

// Admin API endpoints
export const adminAPI = {
  // Dashboard and analytics
  getDashboardStats: () => api.get('/admin/stats'),
  getCourseAnalytics: (params) => api.get('/admin/courses/analytics', { params }),
  
  // User management
  getAllUsers: (params) => api.get('/admin/users', { params }),
  updateUserRole: (userId, roleData) => api.put(`/admin/users/${userId}/role`, roleData),
  
  // Course management
  getAdminCourses: () => api.get('/admin/courses'),
  createCourse: (courseData) => api.post('/admin/courses', courseData),
  getCourse: (id) => api.get(`/admin/courses/${id}`),
  updateCourse: (id, courseData) => api.put(`/admin/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
};

export default api;
