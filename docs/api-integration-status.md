# EdHub API Integration Status & Missing Endpoints

## 📋 Overview
This document outlines the current API integration status between the frontend and backend, and lists the missing API endpoints that need to be implemented.

## ✅ Working APIs (Already Implemented in Backend)

### Authentication APIs
- `POST /api/auth/login` - User login ✅
- `POST /api/auth/register` - User registration ✅  
- `GET /api/auth/me` - Get current user info ✅
- `GET /api/auth/logout` - User logout ✅

### Course APIs
- `GET /api/courses` - Get all courses ⚠️ (Note: has issues mentioned in backend)
- `GET /api/courses/:id` - Get single course ✅
- `POST /api/courses` - Create course (instructor/admin) ✅
- `PUT /api/courses/:id` - Update course ✅
- `DELETE /api/courses/:id` - Delete course ✅
- `GET /api/courses/instructor` - Get instructor's courses ✅
- `POST /api/courses/:id/enroll` - Enroll in course ✅
- `PUT /api/courses/:id/progress` - Update course progress ✅

### Enrollment APIs
- `GET /api/enrollments` - Get user's enrolled courses ✅

### Admin APIs
- `GET /api/admin/stats` - Dashboard statistics ✅
- `GET /api/admin/users` - Get all users ✅
- `PUT /api/admin/users/:id/role` - Update user role ✅
- `GET /api/admin/courses` - Get all courses (admin view) ✅
- `GET /api/admin/courses/analytics` - Course analytics ✅

## ❌ Missing APIs (Need Implementation)

### User Profile Management
- `GET /api/user/profile` - Get user profile details
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password
- `POST /api/user/avatar` - Upload user avatar
- `GET /api/user/settings` - Get user preferences
- `PUT /api/user/settings` - Update user preferences

### Search & Filtering
- `GET /api/search/courses` - Search courses with filters
- `GET /api/search/suggestions` - Get search suggestions/autocomplete
- `GET /api/search/instructors` - Search instructors

### Course Reviews & Ratings
- `GET /api/courses/:id/reviews` - Get course reviews
- `POST /api/courses/:id/reviews` - Add course review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/user` - Get user's reviews

### Notifications System
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification
- `GET /api/notifications/unread-count` - Get unread notification count

### Progress Tracking
- `GET /api/progress/course/:id` - Get detailed course progress
- `PUT /api/progress/course/:id/lesson/:lessonId` - Update lesson progress
- `GET /api/progress/stats` - Get overall learning statistics
- `POST /api/progress/complete-lesson` - Mark lesson as complete
- `GET /api/progress/certificates` - Get earned certificates

### Course Content Management
- `GET /api/courses/:id/content` - Get course content/lessons
- `GET /api/courses/:id/lessons/:lessonId` - Get specific lesson
- `POST /api/courses/:id/lessons` - Add lesson (instructor/admin)
- `PUT /api/courses/:id/lessons/:lessonId` - Update lesson
- `DELETE /api/courses/:id/lessons/:lessonId` - Delete lesson

### Categories & Tags
- `GET /api/categories` - Get all course categories
- `GET /api/categories/:id/courses` - Get courses by category
- `GET /api/tags` - Get all tags
- `GET /api/tags/:tag/courses` - Get courses by tag

### Payment & Enrollment
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history
- `POST /api/enrollments/bulk` - Bulk enroll in courses

### Analytics & Reporting
- `GET /api/analytics/user-stats` - Individual user learning analytics
- `GET /api/analytics/course-performance` - Course performance metrics
- `GET /api/analytics/learning-trends` - Learning trends and patterns

### Communication
- `GET /api/discussions/:courseId` - Get course discussions
- `POST /api/discussions/:courseId` - Create discussion post
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message

## 🔧 Required Backend Model Updates

### User Model Enhancements
```javascript
// Add these fields to User model
profilePicture: String, // URL to profile image
bio: String,
socialLinks: {
  linkedin: String,
  github: String,
  website: String
},
preferences: {
  emailNotifications: Boolean,
  pushNotifications: Boolean,
  theme: String
},
lastLoginAt: Date,
isEmailVerified: Boolean
```

### Course Model Enhancements
```javascript
// Add these fields to Course model
thumbnail: String, // Course thumbnail URL
videoPreview: String, // Preview video URL
tags: [String],
difficulty: String, // Beginner, Intermediate, Advanced
estimatedHours: Number,
certificates: Boolean, // Whether course offers certificates
prerequisites: [String],
learningOutcomes: [String],
syllabus: [{
  title: String,
  lessons: [{
    title: String,
    duration: Number,
    type: String, // video, text, quiz
    content: String,
    resources: [String]
  }]
}]
```

### New Models Needed
```javascript
// Review Model
{
  user: ObjectId,
  course: ObjectId,
  rating: Number,
  comment: String,
  createdAt: Date,
  updatedAt: Date
}

// Notification Model
{
  user: ObjectId,
  title: String,
  message: String,
  type: String, // enrollment, completion, reminder
  isRead: Boolean,
  createdAt: Date
}

// Progress Model
{
  user: ObjectId,
  course: ObjectId,
  completedLessons: [ObjectId],
  progressPercentage: Number,
  timeSpent: Number, // in minutes
  lastAccessed: Date,
  isCompleted: Boolean,
  completedAt: Date
}

// Certificate Model
{
  user: ObjectId,
  course: ObjectId,
  issuedDate: Date,
  certificateId: String,
  downloadUrl: String
}
```

## 🚀 Implementation Priority

### High Priority (Core Features)
1. Fix course listing API (`GET /api/courses`) 
2. User profile management APIs
3. Course content management APIs
4. Progress tracking APIs
5. Search and filtering APIs

### Medium Priority (Enhanced Features)
1. Review and rating system
2. Notification system
3. Categories and tags management
4. Basic analytics

### Low Priority (Advanced Features)
1. Payment integration
2. Advanced analytics
3. Discussion forums
4. Messaging system

## 📝 Frontend Integration Notes

### Current Status
- ✅ Authentication flow implemented
- ✅ Course listing with fallback data
- ✅ Course detail page with enrollment
- ✅ Dashboard with enrolled courses
- ✅ API service layer created
- ✅ Error handling implemented

### Next Steps
1. Fix the backend course listing endpoint
2. Implement user profile management
3. Add course content display
4. Implement progress tracking
5. Add search functionality
6. Create admin dashboard integration

## 🔍 Testing Checklist

### Before Production
- [ ] All API endpoints return consistent response format
- [ ] Error handling covers all edge cases
- [ ] Authentication middleware properly protects routes
- [ ] Data validation on all inputs
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database indexes optimized
- [ ] API documentation updated

## 📞 Contact & Support
For questions about API implementation or integration issues, please refer to the backend documentation or create an issue in the project repository.
