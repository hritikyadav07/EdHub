import express from 'express';
import { 
  getDashboardStats, 
  getAllUsers, 
  updateUserRole, 
  getAllCourses,
  updateCourse,
  deleteCourse,
  createCourse,
  getCourseAnalytics
} from '../controller/admin.js';
import { protect, authorize } from '../middleware/auth.js';

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

export default router;
