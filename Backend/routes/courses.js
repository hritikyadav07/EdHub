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
  .get(showAllCourses) // not working properly - tested with postman
  .post(protect, authorize('instructor','admin'), addCourse); // working properly - tested with postman



router.route('/instructor')
  .get(protect, authorize('instructor', 'admin'), getInstructorCourses);
//get admin or instructor created courses - working properly - tested with postman


router.route('/:id')
  .get(showCourse) // working properly - tested with postman
  .put(protect, updateCourse) // working properly - tested with postman
  .delete(protect, deleteCourse); // working properly - tested with postman

router.route('/:id/enroll')
  .post(protect, authorize('student'), enrollInCourse); // working properly - tested with postman


router.route('/:id/progress')
  .put(protect, updateCourseProgress); // working properly - tested with postman

export default router;


//verified - true