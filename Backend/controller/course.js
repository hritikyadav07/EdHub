import { Course } from "../model/Course.js";
import { User } from "../model/User.js";

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructors)
export const addCourse = async (req, res) => {
  try {
    // Add user id to req.body
    req.body.instructor = req.user.id;
    
    const course = await Course.create(req.body);
    
    // Add course to user's created courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdCourses: course._id }
    });
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; //woking properly - tested with postman


// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const showAllCourses = async (req, res) => {
  try {
    const { category='all', level='all', price, search } = req.query;
    let query = {};
    
    // Build filter object based on query params
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (level && level !== 'all') {
      query.level = level;
    }
    
    if (price) {
      if (price === 'under50') {
        query.price = { $lt: 50 };
      } else if (price === '50to100') {
        query.price = { $gte: 50, $lte: 100 };
      } else if (price === 'over100') {
        query.price = { $gt: 100 };
      }
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only return published courses for regular users
    if (!req.user || req.user.role !== 'admin') {
      query.published = true;
    }
    
    const courses = await Course.find(query)
      .populate('instructor', 'name avatar')
      .select('-modules'); // Don't include modules for listing
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; // working properly - tested with postman
// show course processing the query params and returning the courses based on the filters applied.
// The query params are category, level, price, and search. The function builds a query object based on the provided filters and then fetches the courses from the database. It also populates the instructor field with name and avatar, and excludes the modules field from the response.



// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const showCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    // Check if course is published or user is instructor/admin
    if (!course.published && 
        (!req.user || 
         (req.user.id !== course.instructor._id.toString() && 
          req.user.role !== 'admin'))) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this course'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; // working properly - tested with postman

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Course owner or Admin)
export const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    // Make sure user is course owner or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this course'
      });
    }
    
    // Update lastUpdated date
    req.body.lastUpdated = Date.now();
    
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; // working properly - tested with postman

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Course owner or Admin)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    // Make sure user is course owner or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this course'
      });
    }
    
    // Remove course from instructor's createdCourses array
    await User.findByIdAndUpdate(course.instructor, {
      $pull: { createdCourses: course._id }
    });
    
    // Remove course from enrolled students' enrolledCourses array
    await User.updateMany(
      { enrolledCourses: course._id },
      { $pull: { enrolledCourses: course._id } }
    );
    
    await course.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; //working properly - tested with postman

// @desc    Get courses by instructor
// @route   GET /api/courses/instructor
// @access  Private (Instructor)
export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; // working properly - tested with postman



//verfied - true