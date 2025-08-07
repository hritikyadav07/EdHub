# Missing APIs Summary for EdHub Backend

## 🚨 Critical Issues to Fix First

### 1. Course Listing API (`GET /api/courses`)
**Status:** ⚠️ Has issues (mentioned in backend code)
**Frontend Impact:** Course page shows fallback data
**Priority:** HIGH

---

## 📝 Complete List of Missing APIs

### User Profile Management
```javascript
GET    /api/user/profile              - Get user profile details
PUT    /api/user/profile              - Update user profile  
PUT    /api/user/change-password      - Change password
POST   /api/user/avatar               - Upload user avatar
GET    /api/user/settings             - Get user preferences
PUT    /api/user/settings             - Update user preferences
```

### Search & Filtering
```javascript
GET    /api/search/courses            - Search courses with filters
GET    /api/search/suggestions        - Get search suggestions
GET    /api/search/instructors        - Search instructors
```

### Course Reviews & Ratings
```javascript
GET    /api/courses/:id/reviews       - Get course reviews
POST   /api/courses/:id/reviews       - Add course review
PUT    /api/reviews/:id               - Update review
DELETE /api/reviews/:id               - Delete review
GET    /api/reviews/user              - Get user's reviews
```

### Notifications
```javascript
GET    /api/notifications             - Get user notifications
PUT    /api/notifications/:id/read    - Mark notification as read
PUT    /api/notifications/read-all    - Mark all as read
DELETE /api/notifications/:id         - Delete notification
GET    /api/notifications/unread-count - Get unread count
```

### Progress Tracking
```javascript
GET    /api/progress/course/:id       - Get course progress
PUT    /api/progress/course/:id/lesson/:lessonId - Update lesson progress
GET    /api/progress/stats            - Get learning statistics
POST   /api/progress/complete-lesson  - Mark lesson complete
GET    /api/progress/certificates     - Get certificates
```

### Course Content Management
```javascript
GET    /api/courses/:id/content       - Get course lessons
GET    /api/courses/:id/lessons/:lessonId - Get specific lesson
POST   /api/courses/:id/lessons       - Add lesson
PUT    /api/courses/:id/lessons/:lessonId - Update lesson
DELETE /api/courses/:id/lessons/:lessonId - Delete lesson
```

### Categories & Tags
```javascript
GET    /api/categories               - Get all categories
GET    /api/categories/:id/courses   - Get courses by category
GET    /api/tags                     - Get all tags
GET    /api/tags/:tag/courses        - Get courses by tag
```

### Payment & Enrollment
```javascript
POST   /api/payments/create-intent   - Create payment intent
POST   /api/payments/confirm         - Confirm payment
GET    /api/payments/history         - Payment history
POST   /api/enrollments/bulk         - Bulk enrollment
```

### Analytics & Reporting
```javascript
GET    /api/analytics/user-stats     - User learning analytics
GET    /api/analytics/course-performance - Course performance
GET    /api/analytics/learning-trends - Learning trends
```

### Communication
```javascript
GET    /api/discussions/:courseId    - Course discussions
POST   /api/discussions/:courseId    - Create discussion
GET    /api/messages                 - Get messages
POST   /api/messages                 - Send message
```

---

## 🏗️ Required Database Models

### New Models to Create:
1. **Review** - Course reviews and ratings
2. **Notification** - User notifications
3. **Progress** - Learning progress tracking
4. **Certificate** - Course completion certificates
5. **Discussion** - Course discussions
6. **Message** - User messaging
7. **Category** - Course categories
8. **Tag** - Course tags

### Models to Enhance:
1. **User** - Add profile fields, preferences, social links
2. **Course** - Add thumbnail, tags, syllabus, prerequisites
3. **Enrollment** - Add progress tracking fields

---

## ⚡ Implementation Steps

### Step 1: Fix Existing Issues
1. Fix course listing API response format
2. Standardize all API response structures
3. Add proper error handling

### Step 2: Core Features (Week 1-2)
1. User profile management
2. Course content management  
3. Progress tracking system
4. Search and filtering

### Step 3: Enhanced Features (Week 3-4)
1. Review and rating system
2. Notification system
3. Categories and tags
4. Basic analytics

### Step 4: Advanced Features (Week 5+)
1. Payment integration
2. Discussion forums
3. Advanced analytics
4. Messaging system

---

## 🧪 Testing Requirements

Each API endpoint should include:
- ✅ Input validation
- ✅ Authentication checks
- ✅ Authorization verification
- ✅ Error handling
- ✅ Rate limiting
- ✅ Unit tests
- ✅ Integration tests

---

## 📊 Frontend Impact

### Pages Affected by Missing APIs:
- **Courses Page**: Needs search/filter APIs
- **Course Detail**: Needs reviews, content APIs  
- **Dashboard**: Needs progress, notification APIs
- **Profile**: Needs complete user management APIs
- **Admin**: Needs analytics, user management APIs

### Current Workarounds:
- Mock data fallbacks implemented
- Error handling with toast notifications
- Loading states for better UX
- Protected routes for authentication

---

## 🚀 Quick Start for Backend Developer

1. **Set up development environment**
   ```bash
   cd Backend
   npm install
   npm start
   ```

2. **Check existing APIs**
   - Test with Postman collection
   - Review controller files
   - Check database models

3. **Start with high priority APIs**
   - Fix course listing first
   - Implement user profile management
   - Add progress tracking

4. **Follow API conventions**
   - Consistent response format
   - Proper HTTP status codes
   - Clear error messages
   - RESTful design patterns

---

**Need Help?** 
- Check existing controller files for patterns
- Review middleware for authentication
- Look at existing models for data structure
- Test with frontend integration continuously
