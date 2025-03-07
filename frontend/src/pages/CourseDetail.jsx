import React, { useState, useEffect } from 'react';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // In a real app, you'd get the course ID from URL params
  // For example: const { id } = useParams();
  
  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchCourseDetails = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setCourse({
            id: 1, 
            title: 'JavaScript Fundamentals', 
            instructor: 'John Doe', 
            price: 49.99, 
            image: 'https://via.placeholder.com/300x200',
            rating: 4.5,
            students: 1234,
            description: 'A comprehensive guide to JavaScript basics and beyond. Learn variables, functions, objects, and more!',
            modules: [
              { title: 'Introduction to JavaScript', duration: '1h 20m' },
              { title: 'Variables and Data Types', duration: '2h 15m' },
              { title: 'Functions and Scope', duration: '1h 45m' },
              { title: 'Objects and Arrays', duration: '2h 30m' },
              { title: 'DOM Manipulation', duration: '3h 00m' },
            ]
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500 text-xl">Loading course details...</p>
    </div>
  );
  
  if (!course) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-xl">Course not found</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-2">Instructor: <span className="font-medium">{course.instructor}</span></p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-gray-700">{course.rating}/5</span>
              <span className="text-gray-500 ml-2">({course.students} students)</span>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-6">${course.price}</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-colors flex-1 text-center">
                Enroll Now
              </button>
              <button className="border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-md transition-colors flex-1 text-center">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t">
          <h2 className="text-2xl font-bold mb-4">About this course</h2>
          <p className="text-gray-700 mb-8">{course.description}</p>
          
          <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
          <div className="border rounded-lg overflow-hidden">
            {course.modules.map((module, index) => (
              <div 
                key={index} 
                className={`flex justify-between p-4 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } ${index !== 0 ? 'border-t' : ''}`}
              >
                <span className="font-medium">{module.title}</span>
                <span className="text-gray-600">{module.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
