import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Badge from '../components/Badge';
import Input from '../components/Input';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: 'all',
    category: 'all',
    price: 'all'
  });
  const { theme } = useTheme();

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchCourses = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockCourses = [
            { 
              id: 1, 
              title: 'JavaScript Fundamentals', 
              slug: 'javascript-fundamentals',
              instructor: 'John Doe', 
              price: 49.99, 
              image: 'https://via.placeholder.com/300x200',
              rating: 4.5,
              students: 1234,
              duration: '12h 30m',
              level: 'Beginner',
              category: 'Programming',
              bestseller: true
            },
            { 
              id: 2, 
              title: 'React for Beginners', 
              slug: 'react-for-beginners',
              instructor: 'Jane Smith', 
              price: 59.99, 
              image: 'https://via.placeholder.com/300x200',
              rating: 4.8,
              students: 982,
              duration: '15h 45m',
              level: 'Beginner',
              category: 'Web Development',
              featured: true
            },
            { 
              id: 3, 
              title: 'Advanced CSS Techniques', 
              slug: 'advanced-css-techniques',
              instructor: 'Bob Johnson', 
              price: 39.99, 
              image: 'https://via.placeholder.com/300x200',
              rating: 4.2,
              students: 756,
              duration: '8h 20m',
              level: 'Intermediate',
              category: 'Web Development'
            },
            { 
              id: 4, 
              title: 'Python Data Science', 
              slug: 'python-data-science',
              instructor: 'Sarah Williams', 
              price: 79.99, 
              image: 'https://via.placeholder.com/300x200',
              rating: 4.9,
              students: 2345,
              duration: '22h 15m',
              level: 'Advanced',
              category: 'Data Science',
              bestseller: true
            },
            { 
              id: 5, 
              title: 'UI/UX Design Masterclass', 
              slug: 'ui-ux-design-masterclass',
              instructor: 'Michael Brown', 
              price: 64.99, 
              image: 'https://via.placeholder.com/300x200',
              rating: 4.7,
              students: 1089,
              duration: '18h 30m',
              level: 'Intermediate',
              category: 'Design'
            },
            { 
              id: 6, 
              title: 'Node.js Backend Development', 
              slug: 'nodejs-backend-development',
              instructor: 'David Wilson', 
              price: 54.99, 
              image: 'https://via.placeholder.com/300x200',
              rating: 4.6,
              students: 876,
              duration: '16h 20m',
              level: 'Advanced',
              category: 'Programming'
            }
          ];
          setCourses(mockCourses);
          setFilteredCourses(mockCourses);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Apply filters and search term whenever they change
  useEffect(() => {
    let result = [...courses];
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply level filter
    if (filters.level !== 'all') {
      result = result.filter(course => course.level === filters.level);
    }
    
    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(course => course.category === filters.category);
    }
    
    // Apply price filter
    if (filters.price !== 'all') {
      switch (filters.price) {
        case 'under50':
          result = result.filter(course => course.price < 50);
          break;
        case '50to100':
          result = result.filter(course => course.price >= 50 && course.price <= 100);
          break;
        case 'over100':
          result = result.filter(course => course.price > 100);
          break;
        default:
          break;
      }
    }
    
    setFilteredCourses(result);
  }, [searchTerm, filters, courses]);

  // Get unique categories and levels for filter options
  const categories = ['all', ...new Set(courses.map(course => course.category))];
  const levels = ['all', ...new Set(courses.map(course => course.level))];

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className={`container mx-auto px-4 py-8`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Our Courses</h1>
        <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Explore our wide range of courses and find the perfect one to enhance your skills.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Search courses by title, instructor, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              className={`flex-1 px-3 py-2 rounded-md border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
            
            <select
              className={`flex-1 px-3 py-2 rounded-md border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              className={`flex-1 px-3 py-2 rounded-md border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size="lg" />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setFilters({ level: 'all', category: 'all', price: 'all' });
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div>
          <p className="mb-4">{filteredCourses.length} courses found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <Card key={course.id} className="flex flex-col">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {course.bestseller && (
                    <Badge variant="warning" className="absolute top-2 left-2">
                      Bestseller
                    </Badge>
                  )}
                  {course.featured && (
                    <Badge variant="info" className="absolute top-2 left-2">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="primary">{course.level}</Badge>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{course.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    By {course.instructor}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{course.rating}</span>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ml-2`}>
                      ({course.students} students)
                    </span>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">${course.price}</span>
                      <Link to={`/courses/${course.slug}`}>
                        <Button variant="primary">
                          View Course
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
