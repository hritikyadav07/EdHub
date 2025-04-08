import express from 'express';
import { getEnrolledCourses } from '../controller/enrollment.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getEnrolledCourses);

export default router;

// verified - true 
