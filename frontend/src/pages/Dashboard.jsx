import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchUserData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setUserCourses([
            { 
              id: 1, 
              title: 'JavaScript Fundamentals', 
              progress: 45, 
              lastAccessed: '2023-08-15',
              image: 'https://via.placeholder.com/100'
            },
            { 
              id: 2, 
              title: 'React for Beginners', 
              progress: 20, 
              lastAccessed: '2023-08-10',
              image: 'https://via.placeholder.com/100'
            },
            { 
              id: 4, 
              title: 'Node.js Essentials', 
              progress: 0, 
              lastAccessed: null,
              image: 'https://via.placeholder.com/100'
            }
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('enrolled')}
          className={`pb-4 px-6 font-medium ${
            activeTab === 'enrolled' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Courses
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-6 font-medium ${
            activeTab === 'profile' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Profile
        </button>
        <button 
          onClick={() => setActiveTab('certificates')}
          className={`pb-4 px-6 font-medium ${
            activeTab === 'certificates' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Certificates
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      ) : (
        <div className="dashboard-content">
          {activeTab === 'enrolled' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Enrolled Courses</h2>
              {userCourses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-card p-4 flex flex-col md:flex-row items-center">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 px-4 py-2 md:py-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{width: `${course.progress}%`}}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{course.progress}% complete</span>
                      <span className="text-gray-500">Last accessed: {course.lastAccessed || 'Not started'}</span>
                    </div>
                  </div>
                  <button className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md mt-4 md:mt-0">
                    Continue
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    defaultValue="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Bio
                  </label>
                  <textarea 
                    defaultValue="Learning enthusiast"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                  ></textarea>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-md">
                  Save Changes
                </button>
              </form>
            </div>
          )}
          
          {activeTab === 'certificates' && (
            <div className="bg-white rounded-lg shadow-card p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Your Certificates</h2>
              <p className="mb-6 text-gray-600">Complete courses to earn certificates</p>
              <div className="py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-gray-500 text-lg">You haven't earned any certificates yet</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
