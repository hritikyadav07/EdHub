const express = require('express');
const { 
  getDashboardStats, 
  getAllUsers, 
  updateUserRole, 
  getAllCourses,
  updateCourse,
  deleteCourse,
  createCourse,
  getCourseAnalytics
} = require('../controller/admin');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard and analytics routes
router.get('/stats', getDashboardStats);
router.get('/courses/analytics', getCourseAnalytics);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

// Course management routes
router.get('/courses', getAllCourses);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

module.exports = router;
