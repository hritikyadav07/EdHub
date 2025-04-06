import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.get('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Course API calls
export const courseAPI = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
};

// Enrollment API calls
export const enrollmentAPI = {
  getUserEnrollments: () => api.get('/enrollments'),
  enrollInCourse: (courseId) => api.post(`/enrollments/${courseId}`),
  updateProgress: (courseId, progressData) => 
    api.put(`/enrollments/${courseId}/progress`, progressData),
};

// Export instance for custom calls
export default api;
