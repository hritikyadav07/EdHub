import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Alert from '../components/Alert';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('curriculum');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const { theme } = useTheme();
  
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
            level: 'Beginner',
            lastUpdated: '2023-08-15',
            language: 'English',
            certificateAvailable: true,
            previewVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            totalDuration: '10h 50m',
            modules: [
              { title: 'Introduction to JavaScript', duration: '1h 20m', preview: true },
              { title: 'Variables and Data Types', duration: '2h 15m', preview: false },
              { title: 'Functions and Scope', duration: '1h 45m', preview: false },
              { title: 'Objects and Arrays', duration: '2h 30m', preview: false },
              { title: 'DOM Manipulation', duration: '3h 00m', preview: false },
            ],
            requirements: [
              'Basic understanding of HTML and CSS',
              'A computer with internet access',
              'No prior JavaScript knowledge required'
            ],
            whatYoullLearn: [
              'JavaScript fundamentals including variables, data types, and functions',
              'How to manipulate the DOM',
              'Working with events and event listeners',
              'Modern ES6+ features and syntax',
              'Building interactive web applications'
            ],
            reviews: [
              { id: 1, user: 'Alice Smith', rating: 5, comment: 'Great course! Easy to follow and packed with useful information.', date: '2023-07-15' },
              { id: 2, user: 'Bob Johnson', rating: 4, comment: 'Very comprehensive. Could use more examples though.', date: '2023-06-22' }
            ]
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader size="lg" />
    </div>
  );
  
  if (!course) return (
    <div className="flex justify-center items-center h-screen">
      <Alert type="error" title="Course Not Found">
        The requested course could not be found.
      </Alert>
    </div>
  );

  return (
    <div className={`container mx-auto px-4 py-8`}>
      <Card className="overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button 
                  variant="primary"
                  onClick={() => setShowPreviewModal(true)}
                  className="flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Preview Course
                </Button>
              </div>
            </div>
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="primary">{course.level}</Badge>
              <Badge variant="info">{course.language}</Badge>
              {course.certificateAvailable && <Badge variant="success">Certificate Available</Badge>}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Instructor: <span className="font-medium">{course.instructor}</span>
            </p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{course.rating}/5</span>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ml-2`}>({course.students} students)</span>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} ml-4`}>
                Last updated: {course.lastUpdated}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Total Duration: {course.totalDuration}</span>
            </div>
            <h2 className="text-3xl font-bold text-primary-600 mb-6">${course.price}</h2>
            
            {cartSuccess && (
              <Alert type="success" className="mb-4">
                Course added to cart successfully!
              </Alert>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="flex-1"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                isLoading={addingToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <div className="border-b mb-6">
              <div className="flex">
                {['curriculum', 'overview', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium uppercase text-sm tracking-wider ${
                      activeTab === tab
                        ? `border-b-2 border-primary-600 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`
                        : `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              {activeTab === 'curriculum' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Course Content</h3>
                  <div className={`border rounded-lg overflow-hidden ${theme === 'dark' ? 'border-gray-700' : ''}`}>
                    {course.modules.map((module, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between p-4 ${
                          theme === 'dark'
                            ? index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'
                            : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } ${index !== 0 ? theme === 'dark' ? 'border-t border-gray-700' : 'border-t' : ''}`}
                      >
                        <div className="flex items-center">
                          {module.preview ? (
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="mr-3"
                              onClick={() => setShowPreviewModal(true)}
                            >
                              Preview
                            </Button>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                          <span className="font-medium">{module.title}</span>
                        </div>
                        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{module.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'overview' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{course.description}</p>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.whatYoullLearn.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Student Reviews</h3>
                  <div className="mb-8 flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <span className="text-4xl font-bold">{course.rating}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{course.students} students</span>
                    </div>
                    <div className="flex-grow">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = course.reviews.filter(r => Math.round(r.rating) === star).length;
                        const percentage = (count / course.reviews.length) * 100 || 0;
                        return (
                          <div key={star} className="flex items-center">
                            <span className="text-sm w-10">{star} stars</span>
                            <div className="mx-4 w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="text-sm w-10">{percentage.toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {course.reviews.map((review) => (
                      <Card key={review.id} className="p-4" hover={false}>
                        <div className="flex justify-between mb-2">
                          <h4 className="font-bold">{review.user}</h4>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className={`mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{review.comment}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">This course includes:</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.totalDuration} of video content</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.modules.length} modules</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Downloadable resources</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Full lifetime access</span>
                </li>
                <li className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Access on mobile and TV</span>
                </li>
                {course.certificateAvailable && (
                  <li className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Certificate of completion</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="px-6 pb-6">
              <Button variant="outline" className="w-full mb-3">
                Share Course
              </Button>
              <Button variant="secondary" className="w-full">
                Gift This Course
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Course Preview"
        maxWidth="max-w-3xl"
      >
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={course.previewVideo}
            title="Course Preview"
            className="w-full h-96 rounded-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-4">
          <p className="mb-4 text-lg font-medium">{course.title} - Introduction</p>
          <Button variant="primary" className="w-full" onClick={() => setShowPreviewModal(false)}>
            Close Preview
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default CourseDetail;
