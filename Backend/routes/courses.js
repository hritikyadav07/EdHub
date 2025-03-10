import express from 'express';
import { 
  addCourse, 
  showAllCourses, 
  showCourse, 
  updateCourse, 
  deleteCourse,
  getInstructorCourses 
} from '../controller/course.js';
import { 
  enrollInCourse, 
  updateCourseProgress 
} from '../controller/enrollment.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(showAllCourses)
  .post(protect, authorize('instructor', 'admin'), addCourse);

router.route('/instructor')
  .get(protect, authorize('instructor', 'admin'), getInstructorCourses);

router.route('/:id')
  .get(showCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

router.route('/:id/enroll')
  .post(protect, authorize('student'), enrollInCourse);

router.route('/:id/progress')
  .put(protect, updateCourseProgress);

export default router;
