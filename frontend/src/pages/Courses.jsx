import React, { useState, useEffect } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchCourses = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setCourses([
            { 
              id: 1, 
              title: 'JavaScript Fundamentals', 
              instructor: 'John Doe', 
              price: 49.99, 
              image: 'https://via.placeholder.com/150',
              rating: 4.5
            },
            { 
              id: 2, 
              title: 'React for Beginners', 
              instructor: 'Jane Smith', 
              price: 59.99, 
              image: 'https://via.placeholder.com/150',
              rating: 4.8
            },
            { 
              id: 3, 
              title: 'Advanced CSS Techniques', 
              instructor: 'Bob Johnson', 
              price: 39.99, 
              image: 'https://via.placeholder.com/150',
              rating: 4.2
            }
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Browse Our Courses</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <p className="text-gray-500">Loading courses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-card overflow-hidden transition-transform hover:scale-105">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-gray-700">{course.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${course.price}</span>
                  <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors">
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
