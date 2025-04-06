# EdHub Backend Architecture

This document provides a comprehensive overview of the EdHub backend architecture, explaining how different components work together to provide API services for the EdHub learning platform.

## Table of Contents
- [System Overview](#system-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [Data Models](#data-models)
- [API Routes and Endpoints](#api-routes-and-endpoints)
- [Authentication System](#authentication-system)
- [Request Flow](#request-flow)
- [Database Operations](#database-operations)
- [Error Handling](#error-handling)
- [Environment Configuration](#environment-configuration)
- [Integration with Frontend](#integration-with-frontend)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Versioning](#api-versioning)

## System Overview

The EdHub backend is a RESTful API service built using Node.js and Express.js. It provides the necessary endpoints for the EdHub learning platform, including user authentication, course management, and enrollment features. The system follows the Model-View-Controller (MVC) architectural pattern to organize code and separate concerns.

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **JSON Web Tokens (JWT)**: For authentication
- **bcrypt.js**: For password hashing
- **dotenv**: For environment variable management
- **cors**: For Cross-Origin Resource Sharing
- **cookie-parser**: For handling HTTP cookies

## Project Structure

```
Backend/
│
├── controller/         # Business logic handlers
│   ├── auth.js         # Authentication controllers
│   ├── course.js       # Course management controllers
│   └── enrollment.js   # Enrollment controllers
│
├── middleware/         # Express middleware functions
│   └── auth.js         # Authentication middleware
│
├── model/              # Mongoose data models
│   ├── Course.js       # Course schema and model
│   ├── Payment.js      # Payment schema and model
│   ├── Review.js       # Review schema and model
│   └── User.js         # User schema and model
│
├── routes/             # API route definitions
│   ├── auth.js         # Authentication routes
│   ├── courses.js      # Course routes
│   └── enrollments.js  # Enrollment routes
│
├── server.js           # Main application entry point
├── .env                # Environment variables (not in repo)
└── .env.sample         # Sample environment variables
```

## Core Components

### Server (server.js)
The main entry point for the application that:
- Configures Express and middleware
- Connects to MongoDB
- Defines base routes
- Sets up error handling
- Starts the HTTP server

### Routes
Route files define API endpoints and connect them to their corresponding controller functions:
- **auth.js**: User registration, login, logout, and profile endpoints
- **courses.js**: Course creation, listing, updating, and deletion endpoints
- **enrollments.js**: Enrollment management endpoints

### Controllers
Controllers contain the business logic for handling requests and generating responses:
- **auth.js**: Handles user authentication and profile management
- **course.js**: Manages course operations
- **enrollment.js**: Processes enrollment actions

### Middleware
Middleware functions that process requests before they reach route handlers:
- **auth.js**: Contains `protect` middleware to verify JWT tokens and `authorize` middleware to check user roles

### Models
Mongoose schemas and models that define the structure of data and provide an interface to the database:
- **User.js**: Student and instructor user data
- **Course.js**: Course content and metadata
- **Payment.js**: Payment transaction records
- **Review.js**: Course reviews and ratings

## Data Models

### User Model
```javascript
{
  name: String,         // User's full name
  email: String,        // Unique email address
  password: String,     // Hashed password
  role: String,         // 'student', 'instructor', or 'admin'
  avatar: String,       // URL to profile image
  bio: String,          // User biography
  enrolledCourses: [    // Courses the user is enrolled in
    {
      course: ObjectId, // Reference to Course model
      progress: Number, // Progress percentage (0-100)
      completed: Boolean,
      enrolledAt: Date
    }
  ],
  createdAt: Date
}
```

### Course Model
```javascript
{
  title: String,        // Course title
  slug: String,         // URL-friendly version of title
  description: String,  // Course description
  instructor: ObjectId, // Reference to User model
  price: Number,        // Course price
  image: String,        // URL to course thumbnail
  level: String,        // 'beginner', 'intermediate', or 'advanced'
  category: String,     // Course category
  language: String,     // Course language
  tags: [String],       // Array of tags
  requirements: [String], // Prerequisites
  whatYoullLearn: [String], // Learning outcomes
  modules: [           // Course content structure
    {
      title: String,   // Module title
      lessons: [       // Module lessons
        {
          title: String, // Lesson title
          content: String, // Lesson content/video
          duration: Number, // Lesson duration in minutes
          isPreview: Boolean // Whether lesson is available as preview
        }
      ]
    }
  ],
  totalDuration: Number, // Total course duration in minutes
  enrollments: Number,   // Count of enrolled students
  rating: {              // Course rating information
    average: Number,     // Average rating (1-5)
    count: Number        // Number of ratings
  },
  createdAt: Date,
  updatedAt: Date,
  isPublished: Boolean   // Whether course is available to students
}
```

### Payment Model
```javascript
{
  user: ObjectId,       // Reference to User model
  course: ObjectId,     // Reference to Course model
  amount: Number,       // Payment amount
  currency: String,     // Currency code (e.g., 'USD')
  status: String,       // 'pending', 'completed', 'failed'
  paymentMethod: String, // e.g., 'credit_card', 'paypal'
  transactionId: String, // Payment processor transaction ID
  createdAt: Date
}
```

### Review Model
```javascript
{
  user: ObjectId,       // Reference to User model
  course: ObjectId,     // Reference to Course model
  rating: Number,       // Rating (1-5)
  comment: String,      // Review text
  createdAt: Date,
  updatedAt: Date
}
```

## API Routes and Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
  - Request: `{ name, email, password, role? }`
  - Response: `{ success, token, user }`

- `POST /api/auth/login` - Login a user
  - Request: `{ email, password }`
  - Response: `{ success, token, user }`

- `GET /api/auth/me` - Get current user profile (authenticated)
  - Response: `{ success, user }`

- `GET /api/auth/logout` - Logout current user
  - Response: `{ success, message }`

### Course Routes (`/api/courses`)
- `GET /api/courses` - Get all courses with filtering options
  - Query params: `category`, `level`, `price`, `search`, `limit`, `page`
  - Response: `{ success, count, pagination, data }`

- `POST /api/courses` - Create a new course (instructors only)
  - Request: Course data object
  - Response: `{ success, data }`

- `GET /api/courses/:id` - Get a single course
  - Response: `{ success, data }`

- `PUT /api/courses/:id` - Update a course (instructor who owns it)
  - Request: Updated course data
  - Response: `{ success, data }`

- `DELETE /api/courses/:id` - Delete a course (instructor who owns it)
  - Response: `{ success, data: {} }`

### Enrollment Routes (`/api/enrollments`)
- `GET /api/enrollments` - Get all courses the user is enrolled in
  - Response: `{ success, count, data }`

- `POST /api/enrollments/:courseId` - Enroll in a course
  - Response: `{ success, data }`

- `PUT /api/enrollments/:courseId/progress` - Update course progress
  - Request: `{ progress, lessonId }`
  - Response: `{ success, data }`

## Authentication System

The authentication system uses JSON Web Tokens (JWT) for secure, stateless authentication.

### Registration Process
1. User submits registration data (name, email, password)
2. Backend checks if email already exists
3. If email is unique, password is hashed using bcrypt
4. User record is created in the database
5. JWT token is generated containing user ID and role
6. Token and user data are returned to the client

### Login Process
1. User submits login credentials (email, password)
2. Backend retrieves user record by email
3. Submitted password is compared with stored hash
4. If passwords match, JWT token is generated
5. Token and user data are returned to the client

### Authentication Middleware
The `protect` middleware:
1. Extracts JWT from Authorization header or cookies
2. Verifies token signature using JWT_SECRET
3. Decodes token to get user ID
4. Retrieves user from database
5. Attaches user object to request for use in route handlers

### Authorization Middleware
The `authorize` middleware:
1. Checks user role against allowed roles
2. Grants or denies access to the route

## Request Flow

1. Client sends HTTP request to API endpoint
2. Express middleware processes request (CORS, JSON parsing, cookies)
3. If endpoint is protected, authentication middleware verifies JWT
4. Route handler passes request to appropriate controller
5. Controller performs business logic (data validation, database operations)
6. Controller sends HTTP response back to client

Example flow for creating a course:
```
Client Request
    → CORS middleware
    → Express JSON parser
    → Cookie parser
    → Authentication middleware
    → Authorization middleware (check if instructor)
    → Course routes
    → Course controller
    → Database operation
    → Response
```

## Database Operations

The backend uses Mongoose for MongoDB interactions:

### Creating Records
```javascript
// Using Model.create()
const course = await Course.create({
  title: 'JavaScript Fundamentals',
  // other fields...
});

// Or using new Model().save()
const user = new User({
  name: 'John Doe',
  email: 'john@example.com',
  // other fields...
});
await user.save();
```

### Reading Records
```javascript
// Find all records
const courses = await Course.find();

// Find with filters
const beginnerCourses = await Course.find({ level: 'beginner' });

// Find single record by ID
const course = await Course.findById(courseId);

// Find single record by criteria
const user = await User.findOne({ email: 'john@example.com' });

// Populate references
const courseWithInstructor = await Course.findById(courseId).populate('instructor');
```

### Updating Records
```javascript
// Update by ID
const updatedCourse = await Course.findByIdAndUpdate(
  courseId,
  { price: 49.99 },
  { new: true, runValidators: true }
);

// Update one record
const result = await User.updateOne(
  { email: 'john@example.com' },
  { $set: { bio: 'Updated bio' } }
);
```

### Deleting Records
```javascript
// Delete by ID
await Course.findByIdAndDelete(courseId);

// Delete one record
await User.deleteOne({ email: 'john@example.com' });
```

## Error Handling

The backend implements consistent error handling to provide clear feedback to clients:

### Controller-level Error Handling
Controllers use try-catch blocks to catch and format errors:

```javascript
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
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
```

### Global Error Handler
The application includes a global error handler middleware that catches unhandled errors:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});
```

## Environment Configuration

The application uses environment variables for configuration, loaded via the dotenv package:

### Required Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: JWT expiration period (e.g., "30d" for 30 days)
- `FRONTEND_URL`: URL of the frontend application (for CORS)
- `PORT`: Server port (defaults to 5000)

### .env File Example
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/edhub
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

## Integration with Frontend

The backend API is designed to be consumed by the EdHub frontend application. Integration points include:

### CORS Configuration
The backend allows requests from the frontend origin specified in environment variables:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Authentication Flow with Frontend
1. User registers/logs in via frontend forms
2. Frontend receives JWT and stores it (localStorage or cookies)
3. Frontend includes JWT in Authorization header for subsequent requests
4. Backend validates JWT and identifies the user
5. Backend provides data based on user permissions

### API Response Format
All API responses follow a consistent format for easy handling by the frontend:

```javascript
// Success response
{
  "success": true,
  "data": {...} // or array of data objects
}

// Error response
{
  "success": false,
  "error": "Error message"
}

// Paginated response
{
  "success": true,
  "count": 50,
  "pagination": {
    "page": 2,
    "limit": 10,
    "totalPages": 5
  },
  "data": [...]
}
```

## Testing

The backend includes a comprehensive testing suite to ensure reliability and correct functionality of all components.

### Testing Framework
- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertion library for API testing

### Test Organization
```
Backend/
├── tests/
│   ├── unit/           # Unit tests for individual functions
│   ├── integration/    # Tests for API endpoints
│   ├── fixtures/       # Test data and mock objects
│   └── setup.js        # Test environment configuration
```

### Test Types

#### Unit Tests
Tests for individual functions and methods, isolating the code being tested from its dependencies:

```javascript
// Example unit test for user validation
describe('User Validation', () => {
  it('should validate a user with correct fields', () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    const result = validateUser(user);
    expect(result.isValid).toBe(true);
  });
  
  it('should reject a user with invalid email', () => {
    const user = {
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123'
    };
    
    const result = validateUser(user);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Invalid email format');
  });
});
```

#### Integration Tests
Tests that verify the correct functioning of API endpoints and their interaction with the database:

```javascript
// Example integration test for course creation
describe('POST /api/courses', () => {
  let token;
  
  beforeEach(async () => {
    // Login as instructor and get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'instructor@example.com',
        password: 'password123'
      });
      
    token = res.body.token;
  });
  
  it('should create a new course', async () => {
    const course = {
      title: 'Test Course',
      description: 'This is a test course',
      price: 49.99,
      level: 'beginner'
      // other required fields...
    };
    
    const res = await request(app)
      .post('/api/courses')
      .set('Authorization', `Bearer ${token}`)
      .send(course);
      
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test Course');
  });
  
  it('should return 401 if not authenticated', async () => {
    const res = await request(app)
      .post('/api/courses')
      .send({
        title: 'Test Course',
        description: 'This is a test course'
      });
      
    expect(res.status).toBe(401);
  });
});
```

### Running Tests
Tests can be run using npm scripts defined in package.json:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Deployment

The EdHub backend is designed for flexible deployment options, from development to production environments.

### Deployment Options

#### Development Environment
- Local Node.js server using nodemon for auto-reloading
- Local or cloud-based MongoDB instance
- Development-specific environment variables

#### Production Environment
- Cloud hosting platforms (e.g., AWS, Heroku, DigitalOcean)
- MongoDB Atlas for database hosting
- Production-specific environment variables
- PM2 for process management

### Deployment Process

1. **Build preparation**:
   - Ensure all tests pass
   - Verify environment variables
   - Update documentation if necessary

2. **Deployment steps**:
   ```bash
   # Install dependencies
   npm install --production
   
   # Set environment variables
   export NODE_ENV=production
   export PORT=5000
   export MONGO_URI=your_production_mongodb_uri
   export JWT_SECRET=your_production_jwt_secret
   
   # Start the server
   npm start
   ```

3. **Using PM2 for production**:
   ```bash
   # Install PM2 globally
   npm install pm2 -g
   
   # Start the application with PM2
   pm2 start server.js --name "edhub-backend"
   
   # Configure PM2 to start on system boot
   pm2 startup
   pm2 save
   ```

### CI/CD Integration

The repository includes configuration for continuous integration and deployment:

- **GitHub Actions**: Automatically run tests on pull requests
- **Docker support**: Containerized deployment option
- **Infrastructure as Code**: Terraform scripts for cloud infrastructure

## API Versioning

The API uses versioning to ensure backward compatibility as the platform evolves.

### Versioning Strategy

The API uses URL path versioning (e.g., `/api/v1/courses`), allowing multiple API versions to coexist.

#### Current API Version: v1

All routes are currently under the `/api/v1` namespace:

```javascript
// Example of versioned routes in Express
const express = require('express');
const router = express.Router();

// Mount v1 routes
app.use('/api/v1', require('./routes/v1'));

// In the future, v2 routes can be added while maintaining v1
// app.use('/api/v2', require('./routes/v2'));
```

### Version Transition

When a new API version is needed:

1. Create a new route namespace (e.g., `/api/v2`)
2. Implement new features and breaking changes in v2
3. Maintain v1 routes for backward compatibility
4. Document changes and migration path for clients
5. Provide deprecation notices for v1 features that will be removed

This approach ensures a smooth transition for frontend clients when API changes are needed.
