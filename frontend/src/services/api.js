import axios from "axios";

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Include cookies for authentication
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token or handle requests
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here if needed
    console.log(
      `Making ${config.method.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    // Handle different types of errors
    let errorMessage = "An error occurred";

    if (error.response) {
      // Server responded with error status
      errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        `HTTP ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No response from server. Please check your connection.";
    } else {
      // Something else happened
      errorMessage = error.message;
    }

    console.error("API Error:", errorMessage);

    // Create a standardized error object
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status;
    apiError.response = error.response;

    return Promise.reject(apiError);
  }
);

// API Service Class
class ApiService {
  // GET request
  async get(endpoint, params = {}) {
    return apiClient.get(endpoint, { params });
  }

  // POST request
  async post(endpoint, data = {}) {
    return apiClient.post(endpoint, data);
  }

  // PUT request
  async put(endpoint, data = {}) {
    return apiClient.put(endpoint, data);
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return apiClient.patch(endpoint, data);
  }

  // DELETE request
  async delete(endpoint) {
    return apiClient.delete(endpoint);
  }

  // Upload file (multipart/form-data)
  async uploadFile(endpoint, formData) {
    return apiClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

// Create a singleton instance
const apiService = new ApiService();

// Authentication API calls
export const authAPI = {
  // Login user
  login: async (credentials) => {
    return apiService.post("/auth/login", credentials);
  },

  // Register user
  register: async (userData) => {
    return apiService.post("/auth/register", userData);
  },

  // Get current user info
  getMe: async () => {
    return apiService.get("/auth/me");
  },

  // Logout user
  logout: async () => {
    return apiService.get("/auth/logout");
  },
};

// Course API calls
export const courseAPI = {
  // Get all courses with optional filters
  getAllCourses: async (filters = {}) => {
    return apiService.get("/courses", filters);
  },

  // Get single course by ID
  getCourse: async (id) => {
    return apiService.get(`/courses/${id}`);
  },

  // Create new course (instructor/admin only)
  createCourse: async (courseData) => {
    return apiService.post("/courses", courseData);
  },

  // Update course (instructor/admin only)
  updateCourse: async (id, courseData) => {
    return apiService.put(`/courses/${id}`, courseData);
  },

  // Delete course (instructor/admin only)
  deleteCourse: async (id) => {
    return apiService.delete(`/courses/${id}`);
  },

  // Get instructor's courses
  getInstructorCourses: async () => {
    return apiService.get("/courses/instructor");
  },

  // Enroll in course
  enrollInCourse: async (courseId) => {
    return apiService.post(`/courses/${courseId}/enroll`);
  },

  // Update course progress
  updateProgress: async (courseId, progressData) => {
    return apiService.put(`/courses/${courseId}/progress`, progressData);
  },
};

// Enrollment API calls
export const enrollmentAPI = {
  // Get user's enrolled courses
  getEnrolledCourses: async () => {
    return apiService.get("/enrollments");
  },

  // Get enrollment details
  getEnrollment: async (enrollmentId) => {
    return apiService.get(`/enrollments/${enrollmentId}`);
  },

  // Update enrollment progress
  updateEnrollmentProgress: async (enrollmentId, progressData) => {
    return apiService.put(
      `/enrollments/${enrollmentId}/progress`,
      progressData
    );
  },
};

// Admin API calls
export const adminAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    return apiService.get("/admin/stats");
  },

  // Get all users
  getAllUsers: async (params = {}) => {
    return apiService.get("/admin/users", params);
  },

  // Update user role
  updateUserRole: async (userId, role) => {
    return apiService.put(`/admin/users/${userId}/role`, { role });
  },

  // Get all courses (admin view)
  getAllCourses: async (params = {}) => {
    return apiService.get("/admin/courses", params);
  },

  // Get course analytics
  getCourseAnalytics: async () => {
    return apiService.get("/admin/courses/analytics");
  },

  // Delete user
  deleteUser: async (userId) => {
    return apiService.delete(`/admin/users/${userId}`);
  },

  // Get user details
  getUser: async (userId) => {
    return apiService.get(`/admin/users/${userId}`);
  },
};

// User Profile API calls
export const profileAPI = {
  // Get user profile
  getProfile: async () => {
    return apiService.get("/user/profile");
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return apiService.put("/user/profile", profileData);
  },

  // Change password
  changePassword: async (passwordData) => {
    return apiService.put("/user/change-password", passwordData);
  },

  // Upload avatar
  uploadAvatar: async (formData) => {
    return apiService.uploadFile("/user/avatar", formData);
  },
};

// Search API calls
export const searchAPI = {
  // Search courses
  searchCourses: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    return apiService.get("/search/courses", params);
  },

  // Get search suggestions
  getSearchSuggestions: async (query) => {
    return apiService.get("/search/suggestions", { q: query });
  },
};

// Reviews API calls
export const reviewAPI = {
  // Get course reviews
  getCourseReviews: async (courseId, page = 1, limit = 10) => {
    return apiService.get(`/courses/${courseId}/reviews`, { page, limit });
  },

  // Add course review
  addReview: async (courseId, reviewData) => {
    return apiService.post(`/courses/${courseId}/reviews`, reviewData);
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    return apiService.put(`/reviews/${reviewId}`, reviewData);
  },

  // Delete review
  deleteReview: async (reviewId) => {
    return apiService.delete(`/reviews/${reviewId}`);
  },
};

// Notifications API calls
export const notificationAPI = {
  // Get user notifications
  getNotifications: async (page = 1, limit = 20) => {
    return apiService.get("/notifications", { page, limit });
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    return apiService.put(`/notifications/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    return apiService.put("/notifications/read-all");
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    return apiService.delete(`/notifications/${notificationId}`);
  },
};

// Progress API calls
export const progressAPI = {
  // Get course progress
  getCourseProgress: async (courseId) => {
    return apiService.get(`/progress/course/${courseId}`);
  },

  // Update lesson progress
  updateLessonProgress: async (courseId, lessonId, progressData) => {
    return apiService.put(
      `/progress/course/${courseId}/lesson/${lessonId}`,
      progressData
    );
  },

  // Get overall learning stats
  getLearningStats: async () => {
    return apiService.get("/progress/stats");
  },
};

// Categories API calls
export const categoryAPI = {
  // Get all categories
  getCategories: async () => {
    return apiService.get("/categories");
  },

  // Get courses by category
  getCoursesByCategory: async (categoryId) => {
    return apiService.get(`/categories/${categoryId}/courses`);
  },
};

// Payment API calls (for future implementation)
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: async (courseId, paymentData) => {
    return apiService.post(`/payments/intent/${courseId}`, paymentData);
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId, paymentMethodId) => {
    return apiService.post(`/payments/confirm`, {
      paymentIntentId,
      paymentMethodId,
    });
  },

  // Get payment history
  getPaymentHistory: async (page = 1, limit = 10) => {
    return apiService.get("/payments/history", { page, limit });
  },
};

// Export the main api service and axios instance for advanced usage
export { apiService as default, apiClient };
