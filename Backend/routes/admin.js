import express from 'express';
import { 
  getDashboardStats, 
  getAllUsers, 
  updateUserRole, 
  getAllCourses,
  getCourseAnalytics
} from '../controller/admin.js';
import { protect, authorize } from '../middleware/auth.js';
import { addCourse, updateCourse, deleteCourse } from '../controller/course.js';

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(protect);
router.use(authorize('admin'));//for now only admin can access these routes

// Dashboard and analytics routes
router.get('/stats', getDashboardStats);  // Get dashboard statistics , tested with postman
router.get('/courses/analytics', getCourseAnalytics); // Get course analytics, tested with postman

// User management routes
router.get('/users', getAllUsers); //working fine - tested with postman
router.put('/users/:id/role', updateUserRole); // Update user role, tested with postman

// Course management routes
router.get('/courses', getAllCourses); //working fine - tested with postman
router.post('/courses', addCourse); 
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

export default router;


//verified - true