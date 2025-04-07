import {User} from '../model/User.js';
import {Course} from '../model/Course.js';
import {Payment} from '../model/Payment.js';
import {Review} from '../model/Review.js';

/**
 * Get dashboard statistics
 * @route GET /api/admin/stats
 * @access Private/Admin
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Recent enrollments (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const recentEnrollments = await Payment.countDocuments({
      status: 'completed',
      createdAt: { $gte: lastWeek }
    });
    
    // Popular courses (most enrollments)
    const popularCourses = await Course.find()
      .sort({ enrollments: -1 })
      .limit(5)
      .select('title enrollments rating');

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalStudents,
        totalInstructors,
        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        recentEnrollments,
        popularCourses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get all users
 * @route GET /api/admin/users
 * @access Private/Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update user role
 * @route PUT /api/admin/users/:id/role
 * @access Private/Admin
 */
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['student', 'instructor', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role specified'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get all courses (with additional admin data)
 * @route GET /api/admin/courses
 * @access Private/Admin
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name email')
      .select('title price isPublished enrollments rating createdAt');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Create a course (admin can create for any instructor)
 * @route POST /api/admin/courses
 * @access Private/Admin
 */
export const createCourse = async (req, res) => {
  try {
    // Verify instructor exists
    const instructor = await User.findById(req.body.instructor);
    if (!instructor || instructor.role !== 'instructor') {
      return res.status(400).json({
        success: false,
        error: 'Invalid instructor ID'
      });
    }
    
    const course = await Course.create(req.body);
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update course 
 * @route PUT /api/admin/courses/:id
 * @access Private/Admin
 */
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Delete course
 * @route DELETE /api/admin/courses/:id
 * @access Private/Admin
 */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    // Remove associated reviews
    await Review.deleteMany({ course: req.params.id });
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get course analytics
 * @route GET /api/admin/courses/analytics
 * @access Private/Admin
 */
export const getCourseAnalytics = async (req, res) => {
  try {
    // Enrollment trends over the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const enrollmentTrends = await Payment.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: sixMonthsAgo } } },
      { $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
          revenue: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Category distribution
    const categoryDistribution = await Course.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Rating distribution
    const ratingDistribution = await Review.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        enrollmentTrends,
        categoryDistribution,
        ratingDistribution
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
