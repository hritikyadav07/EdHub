# EdHub Backend Developer Guide

This guide provides comprehensive information about the EdHub backend architecture, data models, API endpoints, and how different components work together.

## Table of Contents
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Data Models](#data-models)
- [Authentication System](#authentication-system)
- [API Endpoints](#api-endpoints)
- [Development Workflow](#development-workflow)
- [Environment Configuration](#environment-configuration)
- [Extending the Backend](#extending-the-backend)

## Project Structure

```
Backend/
│
├── controller/         # Business logic for handling requests
│   ├── admin.js        # Admin controllers
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
│   ├── admin.js        # Admin routes
│   ├── auth.js         # Authentication routes
│   ├── courses.js      # Course routes
│   └── enrollments.js  # Enrollment routes
│
├── server.js           # Main application entry point
├── .env                # Environment variables (not in repo)
└── .env.sample         # Sample environment variables
```

## Architecture Overview

EdHub backend follows a Model-View-Controller (MVC) pattern with RESTful API principles:

1. **Models (Data Layer)**: MongoDB schemas defined with Mongoose ODM
2. **Controllers (Business Logic Layer)**: Handle request processing and response generation
3. **Routes (Presentation Layer)**: Define API endpoints and connect them to controllers
4. **Middleware**: Process requests before they reach route handlers (authentication, validation)

The application uses:
- **Express.js** as the web framework
- **MongoDB** as the database with **Mongoose** ODM
- **JWT** for secure, stateless authentication 
- **bcrypt.js** for password hashing
- **dotenv** for environment variable management
- **cors** for Cross-Origin Resource Sharing

The system is designed with scalability in mind, using async/await patterns for non-blocking I/O operations and proper error handling throughout the codebase.

## Data Models

### User Model
- Represents system users (students, instructors, admins)
- Features role-based permissions and enrollment tracking
- Handles password hashing and authentication using bcrypt
- Supports JWT token generation for authentication
- Relations:
  - Enrolled courses (references Course model)
  - Created courses (for instructors - references Course model)

### Course Model
- Represents educational courses offered on the platform
- Includes nested schemas for modules and lessons
- Features:
  - Automatic slug generation from title
  - Enrollment tracking
  - Rating system
  - Categorization and difficulty levels
- Relations:
  - Instructor (references User model)

### Payment Model
- Tracks financial transactions for course purchases
- Status tracking for payment processing
- Relations:
  - User (references User model)
  - Course (references Course model)

### Review Model
- Stores user reviews and ratings for courses
- Prevents duplicate reviews through compound indexing
- Relations:
  - User (references User model)
  - Course (references Course model)

## Authentication System

The authentication system uses JSON Web Tokens (JWT) for secure, stateless authentication:

1. **Registration**: Users provide credentials, passwords are hashed, and a JWT is issued
2. **Login**: Credentials are verified, and a JWT is issued upon success
3. **Authorization**: JWTs are verified for protected routes
4. **Role-based access**: Different endpoints are restricted based on user roles

### Authentication Middleware

The `protect` middleware verifies the JWT from:
- Authorization header (`Bearer` token)
- Cookies

The `authorize` middleware restricts endpoints to specific user roles.

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user
- `GET /api/auth/me` - Get current user profile
- `GET /api/auth/logout` - Log out the current user

### Course Routes
- `GET /api/courses` - List all courses (filterable)
- `POST /api/courses` - Create a new course (instructors only)
- `GET /api/courses/:id` - Get a single course by ID
- `PUT /api/courses/:id` - Update a course (owner or admin)
- `DELETE /api/courses/:id` - Delete a course (owner or admin)
- `GET /api/courses/instructor` - Get courses created by the logged-in instructor
- `POST /api/courses/:id/enroll` - Enroll in a course
- `PUT /api/courses/:id/progress` - Update course progress

### Enrollment Routes
- `GET /api/enrollments` - Get all courses the current user is enrolled in

## Development Workflow

### Setting Up the Development Environment

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.sample`:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Database Operations

The backend uses Mongoose for MongoDB interactions:

- **Creating data**: `Model.create()` or `new Model().save()`
- **Reading data**: `Model.find()`, `Model.findById()`, `Model.findOne()`
- **Updating data**: `Model.findByIdAndUpdate()`, `Model.updateOne()`
- **Deleting data**: `Model.findByIdAndDelete()`, `Model.deleteOne()`

### Authentication Flow

1. User registers/logs in and receives a JWT
2. Frontend stores JWT in local storage or cookies
3. JWT is sent with each request to protected routes
4. Backend verifies JWT and identifies the user
5. Access is granted or denied based on user role and permissions

## Environment Configuration

Required environment variables:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT expiration period (e.g., "30d" for 30 days)
- `FRONTEND_URL` - URL of the frontend application (for CORS)
- `PORT` - Server port (defaults to 5000)

## Extending the Backend

### Adding a New Model

1. Create a new file in the `model` directory
2. Define the Mongoose schema
3. Export the model

Example:
```javascript
import mongoose from 'mongoose';

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Add more fields...
});

export const NewModel = mongoose.model('NewModel', newSchema);
```

### Adding a New Controller

1. Create a new file in the `controller` directory
2. Import required models
3. Define and export controller functions

Example:
```javascript
import { NewModel } from '../model/NewModel.js';

export const getAllItems = async (req, res) => {
  try {
    const items = await NewModel.find();
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
```

### Adding New Routes

1. Create a new file in the `routes` directory
2. Import Express and required controllers
3. Define routes and export the router

Example:
```javascript
import express from 'express';
import { getAllItems } from '../controller/newController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getAllItems);

export default router;
```

4. Update `server.js` to include the new routes:
```javascript
import newRoutes from './routes/newRoutes.js';
app.use('/api/new-resource', newRoutes);
```

## Connection with Frontend

The backend exposes a RESTful API that the frontend consumes using HTTP requests. The API follows these conventions:

- Uses standard HTTP methods (GET, POST, PUT, DELETE)
- Returns JSON responses with consistent structure
- Uses appropriate HTTP status codes
- Implements CORS to allow requests from the frontend origin
- Authenticates requests using JWT

To connect with the frontend, ensure the `FRONTEND_URL` environment variable is set correctly to allow CORS requests from the React application.
