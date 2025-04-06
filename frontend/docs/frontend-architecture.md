# EdHub Frontend Architecture

This document provides an overview of the EdHub frontend application structure, key components, and how they work together.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [Theme System](#theme-system)
6. [Routing](#routing)
7. [State Management](#state-management)
8. [Styling](#styling)
9. [UI Components](#ui-components)
10. [Pages](#pages)
11. [API Integration](#api-integration)
12. [Error Handling](#error-handling)
13. [Performance Optimization](#performance-optimization)
14. [Accessibility](#accessibility)
15. [Testing](#testing)

## Project Overview

EdHub is a learning platform that allows users to browse, purchase, and consume educational courses. The frontend is built as a single-page application (SPA) with React and incorporates modern web development practices.

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: For animations and transitions
- **React Hot Toast**: For toast notifications
- **Headless UI**: For accessible UI components
- **Hero Icons**: SVG icon collection

## Project Structure

```
frontend/
├── public/             # Static assets and HTML template
├── src/                # Source files
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global CSS
│   └── main.jsx        # Application entry point
├── index.html          # HTML entry point
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Project dependencies and scripts
```

## Component Architecture

The application follows a component-based architecture where:

- **Pages**: High-level components that represent entire screens/routes
- **Components**: Reusable UI elements that handle specific functionality
- **Context**: Global state management for theme, authentication, etc.

## Theme System

The application supports a dark and light theme through the ThemeContext:

### ThemeContext.jsx

The theme system is implemented using React's Context API. The ThemeProvider component manages:

- Theme state (dark/light/system)
- Theme toggle functionality
- Theme persistence via localStorage
- System preference detection
- Toast notifications for theme changes

Key features:
- The user can select between light, dark, or system theme
- The selected theme is saved in localStorage
- The "system" theme option respects the user's OS preferences

## Routing

Routing is handled with React Router. The main routes include:

- `/`: Main landing page
- `/login`: User login
- `/signup`: User registration
- `/courses`: Course listing
- `/courses/:slug`: Individual course details
- `/dashboard`: User dashboard
- `/checkout`: Checkout process
- `/about`: About the platform

The router configuration is defined in `App.jsx` and wraps the entire application.

## State Management

State is managed primarily through:

1. **Local component state**: Using React's `useState` hook for component-specific state
2. **Context API**: For global state like theme preferences
3. **Props**: For passing data between components

## Styling

The application uses Tailwind CSS for styling with:

- Custom color palette (primary, secondary, accent)
- Custom animations and transitions
- Dark mode support
- Responsive design for various screen sizes
- Custom shadows and effects

### tailwind.config.js

The Tailwind configuration extends the default theme with:

- Custom color schemes for primary (blue), secondary (purple), and accent (orange) colors
- Custom shadows for cards
- Custom animations (fade-in, slide-up, etc.)
- Custom transitions

## UI Components

### Core Components

- **Card**: Container with consistent styling, shadows, and hover effects
- **Button**: Styled buttons with variants (primary, outline, etc.) and loading states
- **Input**: Form input fields with validation and error states
- **Alert**: Notification component for success/error messages
- **Badge**: Small label component with different visual styles
- **Modal**: Popup dialog component for overlays
- **Navbar**: Main navigation with responsive mobile menu
- **Footer**: Site footer with links and information

## Pages

### Main Pages

1. **Main.jsx**: Landing page with featured courses and marketing content
2. **Login.jsx**: User login form with validation
3. **Signup.jsx**: User registration form with validation
4. **Courses.jsx**: Course listing with filtering and search
5. **CourseDetail.jsx**: Detailed view of a specific course
6. **Dashboard.jsx**: User dashboard with enrolled courses
7. **Checkout.jsx**: Payment process for course purchase
8. **About.jsx**: Information about the platform

### Key Functionality

- **Authentication**: Login and signup forms with validation
- **Course Discovery**: Browsing, filtering, and searching courses
- **Course Consumption**: Viewing course details and content
- **User Dashboard**: Managing enrolled courses and account
- **Checkout**: Purchasing courses

## Best Practices Implemented

1. **Component Reusability**: Components are designed to be reusable
2. **Responsive Design**: Mobile-first approach with responsive layouts
3. **Accessibility**: Semantic HTML and ARIA attributes
4. **Performance**: Optimized rendering with proper React patterns
5. **Animation**: Subtle animations for better UX
6. **Theme Consistency**: Consistent visual language throughout the app

## API Integration

The frontend communicates with the backend API to fetch and update data. This section outlines the approach to API integration.

### API Client

We use a custom API client built on top of the Fetch API to handle all backend communication:

```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// Create headers with authentication token if available
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Generic API request method
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const options = {
    method,
    headers: getHeaders(),
    credentials: 'include',
  };
  
  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error || 'Something went wrong');
    }
    
    return responseData;
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    throw error;
  }
};

// Exported service methods
export const api = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, data) => apiRequest(endpoint, 'POST', data),
  put: (endpoint, data) => apiRequest(endpoint, 'PUT', data),
  patch: (endpoint, data) => apiRequest(endpoint, 'PATCH', data),
  delete: (endpoint) => apiRequest(endpoint, 'DELETE'),
};
```

### API Services

The API client is used by service modules that handle specific API domains:

```javascript
// src/services/courseService.js
import { api } from './api';

export const courseService = {
  getAllCourses: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/courses?${queryString}`);
  },
  
  getCourseById: (id) => api.get(`/courses/${id}`),
  
  createCourse: (courseData) => api.post('/courses', courseData),
  
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  
  enrollInCourse: (courseId) => api.post(`/enrollments/${courseId}`),
  
  updateProgress: (courseId, progressData) => 
    api.put(`/enrollments/${courseId}/progress`, progressData),
};
```

### Data Fetching in Components

Components use custom hooks to fetch data from the API:

```javascript
// src/hooks/useCourses.js
import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';

export const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseService.getAllCourses(filters);
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [filters]);
  
  return { courses, loading, error };
};
```

## Error Handling

The application implements a consistent error handling approach across all components and interactions.

### Error Boundaries

React Error Boundaries are used to catch JavaScript errors in component trees:

```javascript
// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component Error:", error, errorInfo);
    // Could also send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400">Something went wrong</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            We're sorry, but we couldn't display this content. Please try refreshing the page.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### API Error Handling

API errors are handled consistently with toast notifications:

```javascript
// Example of API error handling in a component
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { courseService } from '../services/courseService';

const CourseEnrollButton = ({ courseId }) => {
  const [enrolling, setEnrolling] = useState(false);
  
  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await courseService.enrollInCourse(courseId);
      toast.success('Successfully enrolled in the course!');
    } catch (error) {
      toast.error(error.message || 'Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };
  
  return (
    <button 
      onClick={handleEnroll}
      disabled={enrolling}
      className="btn btn-primary w-full"
    >
      {enrolling ? 'Enrolling...' : 'Enroll Now'}
    </button>
  );
};
```

### Form Validation Errors

Form validation uses React Hook Form with consistent error display:

```javascript
import { useForm } from 'react-hook-form';

const LoginForm = ({ onLogin }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await onLogin(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          id="email"
          type="email" 
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className={`form-input ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      
      {/* Password field */}
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};
```

## Performance Optimization

The application employs several techniques to ensure optimal performance.

### Code Splitting

React's lazy loading and Suspense are used to split the bundle and load components on demand:

```javascript
// src/App.jsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Checkout = lazy(() => import('./pages/Checkout'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Other routes */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Memoization

React's memoization features prevent unnecessary re-renders:

```javascript
// Using React.memo for components
import { memo } from 'react';

const CourseCard = memo(({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </div>
  );
});

// Using useMemo and useCallback for expensive calculations and event handlers
import { useMemo, useCallback } from 'react';

function CourseFilters({ courses, onFilterChange }) {
  // Memoize expensive calculation
  const categories = useMemo(() => {
    return [...new Set(courses.map(course => course.category))];
  }, [courses]);
  
  // Memoize event handler
  const handleFilterChange = useCallback((category) => {
    onFilterChange({ category });
  }, [onFilterChange]);
  
  return (
    <div className="filters">
      {categories.map(category => (
        <button 
          key={category}
          onClick={() => handleFilterChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
```

### Image Optimization

Images are optimized using responsive image techniques:

```jsx
// src/components/ResponsiveImage.jsx
const ResponsiveImage = ({ src, alt, sizes }) => {
  // Default sizes if not provided
  const imageSizes = sizes || "100vw";
  
  // Generate srcset with different sizes
  const srcSet = [300, 600, 900, 1200, 1800]
    .map(width => `${src}?width=${width} ${width}w`)
    .join(', ');
  
  return (
    <img
      src={`${src}?width=600`} // Fallback size
      srcSet={srcSet}
      sizes={imageSizes}
      alt={alt}
      loading="lazy"
      className="w-full h-auto"
    />
  );
};
```

### Virtualization

For long lists, virtualization is used to render only visible items:

```jsx
// src/components/CourseList.jsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

const CourseList = ({ courses }) => {
  const parentRef = useRef(null);
  
  const rowVirtualizer = useVirtualizer({
    count: courses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimate row height
    overscan: 5,
  });
  
  return (
    <div 
      ref={parentRef}
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <CourseCard course={courses[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Accessibility

The application is built with accessibility as a priority, following WCAG 2.1 guidelines.

### Key Accessibility Features

1. **Semantic HTML**: Using appropriate HTML elements
2. **Keyboard Navigation**: All interactive elements are accessible via keyboard
3. **Screen Reader Support**: ARIA attributes and proper labeling
4. **Focus Management**: Visual indicators for keyboard focus
5. **Color Contrast**: Meeting WCAG AA standards for text contrast
6. **Responsive Design**: Accessible on all device sizes

### Example Implementation

```jsx
// Accessible dropdown component
const Dropdown = ({ label, options, value, onChange, id }) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id}
        className="block text-sm font-medium mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="form-select w-full"
        aria-label={label}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Testing

The frontend includes a comprehensive testing strategy to ensure quality and reliability.

### Testing Approach

1. **Unit Tests**: Testing individual components and functions
2. **Integration Tests**: Testing component interactions
3. **End-to-End Tests**: Testing complete user flows

### Testing Tools

- **Vitest**: Fast testing framework compatible with Vite
- **React Testing Library**: For component testing
- **MSW (Mock Service Worker)**: For API mocking
- **Cypress**: For end-to-end testing

### Example Tests

```jsx
// Example unit test for Button component
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('renders correctly with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('displays loading state correctly', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });
  
  it('applies variant styling correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('bg-primary-600');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary-600');
  });
});
```
