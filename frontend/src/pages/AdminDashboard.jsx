import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  
  useEffect(() => {
    // Check if user is admin, redirect if not
    if (currentUser && currentUser.role !== 'admin') {
      navigate('/');
      return;
    }
    
    fetchDashboardData();
  }, [currentUser, navigate]);
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const statsResponse = await axios.get('/api/admin/stats');
      setStats(statsResponse.data.data);
      
      // Fetch analytics data
      const analyticsResponse = await axios.get('/api/admin/courses/analytics');
      setAnalytics(analyticsResponse.data.data);
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching dashboard data');
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert type="error" title="Error">
          {error}
        </Alert>
      </div>
    );
  }
  
  // Chart data preparations
  const enrollmentChartData = {
    labels: analytics?.enrollmentTrends.map(item => item._id) || [],
    datasets: [
      {
        label: 'Enrollments',
        data: analytics?.enrollmentTrends.map(item => item.count) || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Revenue ($)',
        data: analytics?.enrollmentTrends.map(item => item.revenue) || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y1',
      }
    ],
  };
  
  const categoryChartData = {
    labels: analytics?.categoryDistribution.map(item => item._id) || [],
    datasets: [
      {
        label: 'Courses by Category',
        data: analytics?.categoryDistribution.map(item => item.count) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      }
    ],
  };
  
  const ratingChartData = {
    labels: analytics?.ratingDistribution.map(item => `${item._id} Star`) || [],
    datasets: [
      {
        label: 'Rating Distribution',
        data: analytics?.ratingDistribution.map(item => item.count) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      }
    ],
  };
  
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-4 px-6 font-medium ${
            activeTab === 'overview' 
              ? 'border-b-2 border-primary text-primary' 
              : theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`pb-4 px-6 font-medium ${
            activeTab === 'analytics' 
              ? 'border-b-2 border-primary text-primary' 
              : theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Analytics
        </button>
        <button 
          onClick={() => navigate('/admin/courses')}
          className={`pb-4 px-6 font-medium ${
            theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Manage Courses
        </button>
        <button 
          onClick={() => navigate('/admin/users')}
          className={`pb-4 px-6 font-medium ${
            theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Manage Users
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">Total Users</h3>
              <p className="text-4xl font-bold text-primary-600">{stats.totalUsers}</p>
              <div className="mt-2 text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Students: {stats.totalStudents} | Instructors: {stats.totalInstructors}
                </span>
              </div>
            </Card>
            
            <Card className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">Total Courses</h3>
              <p className="text-4xl font-bold text-primary-600">{stats.totalCourses}</p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">Total Revenue</h3>
              <p className="text-4xl font-bold text-primary-600">${stats.totalRevenue.toFixed(2)}</p>
            </Card>
            
            <Card className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">Recent Enrollments</h3>
              <p className="text-4xl font-bold text-primary-600">{stats.recentEnrollments}</p>
              <div className="mt-2 text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Last 7 days
                </span>
              </div>
            </Card>
          </div>
          
          <div className="mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Popular Courses</h3>
              <div className={`overflow-x-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <table className="min-w-full">
                  <thead>
                    <tr className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}>
                      <th className="py-3 px-4 text-left">Course Title</th>
                      <th className="py-3 px-4 text-center">Enrollments</th>
                      <th className="py-3 px-4 text-center">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.popularCourses.map((course) => (
                      <tr key={course._id} className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}>
                        <td className="py-3 px-4">{course.title}</td>
                        <td className="py-3 px-4 text-center">{course.enrollments}</td>
                        <td className="py-3 px-4 text-center">{course.rating.average.toFixed(1)} ({course.rating.count})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Enrollment Trends</h3>
              <Line 
                data={enrollmentChartData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Enrollments'
                      }
                    },
                    y1: {
                      position: 'right',
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Revenue ($)'
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month'
                      }
                    }
                  },
                }}
              />
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Courses by Category</h3>
              <Bar 
                data={categoryChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </Card>
          </div>
          
          <div className="mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Rating Distribution</h3>
              <div className="flex justify-center" style={{ height: '300px' }}>
                <Pie 
                  data={ratingChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
