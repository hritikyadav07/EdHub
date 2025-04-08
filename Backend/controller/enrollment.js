import { User } from '../model/User.js';
import { Course } from '../model/Course.js';
import { Payment } from '../model/Payment.js';
import crypto from 'crypto';

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private (Students)
export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    // Check if user is already enrolled
    const user = await User.findById(req.user.id);
    const alreadyEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.course.toString() === req.params.id
    );
    
    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        error: 'Already enrolled in this course'
      });
    }
    
    // Process payment (mock for now)









    // In a real application, you would integrate with a payment gateway here
    // For this example, we'll just create a payment record without actual payment processing
    const payment = await Payment.create({
      user: req.user.id,
      course: req.params.id,
      amount: course.price,
      paymentMethod: req.body.paymentMethod || 'card',
      transactionId: `txn_${crypto.randomBytes(10).toString('hex')}` // Mock transaction ID
    });
    
    // Update payment status to completed (in a real app, this would happen after payment confirmation)
    payment.paymentStatus = 'completed';
    await payment.save();
    
    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        enrolledCourses: {
          course: course._id,
          enrolledAt: Date.now()
        }
      }
    });
    
    // Increment student count for the course
    course.students += 1;
    await course.save();
    
    res.status(200).json({
      success: true,
      data: {
        payment,
        course: {
          id: course._id,
          title: course.title
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};  //working properly - tested with postman


// @desc    Get enrolled courses for current user
// @route   GET /api/enrollments
// @access  Private
export const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'enrolledCourses.course',
        select: 'title description image instructor level category'
      });
    
    res.status(200).json({
      success: true,
      count: user.enrolledCourses.length,
      data: user.enrolledCourses
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; //working properly - tested with postman

// @desc    Update course progress
// @route   PUT /api/courses/:id/progress
// @access  Private (Enrolled students)
export const updateCourseProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    
    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        error: 'Progress must be a number between 0 and 100'
      });
    }
    
    // Find user and specific course enrollment
    const user = await User.findById(req.user.id);
    
    const enrollmentIndex = user.enrolledCourses.findIndex(
      enrollment => enrollment.course.toString() === req.params.id
    );
    
    if (enrollmentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not enrolled in this course'
      });
    }
    
    // Update progress and lastAccessed
    user.enrolledCourses[enrollmentIndex].progress = progress;
    user.enrolledCourses[enrollmentIndex].lastAccessed = Date.now();
    
    // Mark as completed if progress is 100%
    if (progress === 100) {
      user.enrolledCourses[enrollmentIndex].completed = true;
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user.enrolledCourses[enrollmentIndex]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; //working properly - tested with postman


// verified - true