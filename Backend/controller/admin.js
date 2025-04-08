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
      { $match: { paymentStatus: 'completed' } }, // Changed from 'status' to 'paymentStatus'
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Recent enrollments (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const recentEnrollments = await Payment.countDocuments({
      paymentStatus: 'completed', // Changed from 'status' to 'paymentStatus'
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
}; //working fine - tested with postman

/**
 * Get all users
 * @route GET /api/admin/users
 * @access Private/Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');//failsafe
    
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
}; //working fine - tested with postman

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
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; //working fine - tested with postman

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
}; //working fine - tested with postman

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
    
    // Enrollment trends over the last 6 months
    const enrollmentTrends = await Payment.aggregate([
      { 
        $match: { 
          paymentStatus: 'completed', // Changed from 'status' to 'paymentStatus'eted', // Changed from 'status' to 'paymentStatus'
          createdAt: { $gte: sixMonthsAgo } 
        } 
      },
      { 
        $project: {
          month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          amount: '$amount'
        }
      },
      { 
        $group: {
          _id: '$month',
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
}; //working fine - tested with postman


//verified - true