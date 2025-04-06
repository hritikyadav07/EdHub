import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
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
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import { ChartBarIcon, UserGroupIcon, AcademicCapIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

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

function AdminAnalytics() {
  const { theme } = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('6months'); // '30days', '6months', '1year'
  
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);
  
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const statsResponse = await axios.get('/api/admin/stats');
      setStats(statsResponse.data.data);
      
      // Fetch analytics data with time range
      const analyticsResponse = await axios.get('/api/admin/courses/analytics', {
        params: { timeRange }
      });
      setAnalytics(analyticsResponse.data.data);
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching analytics data');
      setLoading(false);
    }
  };
  
  // Prepare chart data
  const prepareChartData = () => {
    if (!analytics) return null;
    
    // Revenue and enrollments chart
    const enrollmentTrendData = {
      labels: analytics.enrollmentTrends.map(item => item._id),
      datasets: [
        {
          label: 'Enrollments',
          data: analytics.enrollmentTrends.map(item => item.count),
          borderColor: theme === 'dark' ? 'rgb(99, 179, 237)' : 'rgb(66, 153, 225)',
          backgroundColor: theme === 'dark' ? 'rgba(99, 179, 237, 0.5)' : 'rgba(66, 153, 225, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Revenue ($)',
          data: analytics.enrollmentTrends.map(item => item.revenue),
          borderColor: theme === 'dark' ? 'rgb(72, 187, 120)' : 'rgb(56, 161, 105)',
          backgroundColor: theme === 'dark' ? 'rgba(72, 187, 120, 0.5)' : 'rgba(56, 161, 105, 0.5)',
          yAxisID: 'y1',
        }
      ],
    };
    
    // Category distribution chart
    const categoryData = {
      labels: analytics.categoryDistribution.map(item => item._id),
      datasets: [
        {
          label: 'Courses by Category',
          data: analytics.categoryDistribution.map(item => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(199, 199, 199, 0.7)',
          ],
          borderWidth: 1,
          borderColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
        },
      ],
    };
    
    // Rating distribution chart
    const ratingData = {
      labels: analytics.ratingDistribution.map(item => `${item._id} Star`),
      datasets: [
        {
          label: 'Rating Distribution',
          data: analytics.ratingDistribution.map(item => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
          ],
          borderWidth: 1,
          borderColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
        },
      ],
    };
    
    return {
      enrollmentTrendData,
      categoryData,
      ratingData
    };
  };
  
  const chartData = analytics ? prepareChartData() : null;
  
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
        <Alert type="error" title="Error loading analytics">
          {error}
        </Alert>
      </div>
    );
  }
  
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-8">Platform Analytics</h1>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className={`p-6 border-l-4 ${theme === 'dark' ? 'border-blue-500' : 'border-blue-500'}`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-blue-500 bg-opacity-20' : 'bg-blue-100'} mr-4`}>
              <UserGroupIcon className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} font-medium`}>
                Total Users
              </p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
              <div className="flex items-center mt-1">
                <Badge variant="info" size="sm">{stats.totalStudents} Students</Badge>
                <span className="mx-2">•</span>
                <Badge variant="primary" size="sm">{stats.totalInstructors} Instructors</Badge>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className={`p-6 border-l-4 ${theme === 'dark' ? 'border-purple-500' : 'border-purple-500'}`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-purple-500 bg-opacity-20' : 'bg-purple-100'} mr-4`}>
              <AcademicCapIcon className={`h-8 w-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} />
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'} font-medium`}>
                Total Courses
              </p>
              <p className="text-2xl font-bold">{stats.totalCourses}</p>
              <div className="flex items-center mt-1">
                <Badge variant="success" size="sm">{analytics.categoryDistribution.length} Categories</Badge>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className={`p-6 border-l-4 ${theme === 'dark' ? 'border-green-500' : 'border-green-500'}`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-green-500 bg-opacity-20' : 'bg-green-100'} mr-4`}>
              <CurrencyDollarIcon className={`h-8 w-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-600'} font-medium`}>
                Total Revenue
              </p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
              <div className="flex items-center mt-1">
                <Badge variant="success" size="sm">
                  ${(stats.totalRevenue / (stats.totalStudents || 1)).toFixed(2)} per student
                </Badge>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className={`p-6 border-l-4 ${theme === 'dark' ? 'border-yellow-500' : 'border-yellow-500'}`}>
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-yellow-500 bg-opacity-20' : 'bg-yellow-100'} mr-4`}>
              <ChartBarIcon className={`h-8 w-8 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'} font-medium`}>
                Recent Enrollments
              </p>
              <p className="text-2xl font-bold">{stats.recentEnrollments}</p>
              <div className="flex items-center mt-1">
                <Badge variant="warning" size="sm">Last 7 days</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Time range selector */}
      <div className="flex justify-end mb-6">
        <div className={`flex rounded-md overflow-hidden border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
          {[
            { value: '30days', label: 'Last 30 Days' },
            { value: '6months', label: 'Last 6 Months' },
            { value: '1year', label: 'Last Year' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 ${
                timeRange === option.value
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Enrollment and Revenue Trends */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Enrollment & Revenue Trends</h2>
        <div className="h-80">
          {chartData && (
            <Line
              data={chartData.enrollmentTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    },
                    ticks: {
                      color: theme === 'dark' ? '#A0AEC0' : '#4A5568',
                    },
                  },
                  y: {
                    position: 'left',
                    grid: {
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    },
                    ticks: {
                      color: theme === 'dark' ? '#A0AEC0' : '#4A5568',
                    },
                    title: {
                      display: true,
                      text: 'Enrollments',
                      color: theme === 'dark' ? '#A0AEC0' : '#4A5568',
                    },
                  },
                  y1: {
                    position: 'right',
                    grid: {
                      drawOnChartArea: false,
                    },
                    ticks: {
                      color: theme === 'dark' ? '#A0AEC0' : '#4A5568',
                    },
                    title: {
                      display: true,
                      text: 'Revenue ($)',
                      color: theme === 'dark' ? '#A0AEC0' : '#4A5568',
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                    },
                  },
                  tooltip: {
                    backgroundColor: theme === 'dark' ? '#4A5568' : 'white',
                    titleColor: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                    bodyColor: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                    borderColor: theme === 'dark' ? '#718096' : '#CBD5E0',
                    borderWidth: 1,
                  },
                },
              }}
            />
          )}
        </div>
      </Card>
      
      {/* Category and Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Courses by Category</h2>
          <div className="h-64">
            {chartData && (
              <Bar
                data={chartData.categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      },
                      ticks: {
                        color: theme === 'dark' ? '#A0AEC0' : '#4A5568',
                      },
                    },
                    y: {
                      grid: {
                        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      },
                      ticks: {
                        color: theme === 'dark' ? '#A0AEC0' : '#4A5568',
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: theme === 'dark' ? '#4A5568' : 'white',
                      titleColor: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                      bodyColor: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                      borderColor: theme === 'dark' ? '#718096' : '#CBD5E0',
                      borderWidth: 1,
                    },
                  },
                }}
              />
            )}
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Rating Distribution</h2>
          <div className="h-64 flex justify-center">
            {chartData && (
              <Doughnut
                data={chartData.ratingData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                      },
                    },
                    tooltip: {
                      backgroundColor: theme === 'dark' ? '#4A5568' : 'white',
                      titleColor: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                      bodyColor: theme === 'dark' ? '#E2E8F0' : '#2D3748',
                      borderColor: theme === 'dark' ? '#718096' : '#CBD5E0',
                      borderWidth: 1,
                    },
                  },
                }}
              />
            )}
          </div>
        </Card>
      </div>
      
      {/* Popular Courses */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Top Performing Courses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-center py-3 px-4">Enrollments</th>
                <th className="text-center py-3 px-4">Revenue</th>
                <th className="text-center py-3 px-4">Rating</th>
                <th className="text-center py-3 px-4">Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              {stats.popularCourses.map((course) => (
                <tr key={course._id} className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}>
                  <td className="py-3 px-4">{course.title}</td>
                  <td className="py-3 px-4 text-center">{course.enrollments}</td>
                  <td className="py-3 px-4 text-center">
                    ${(course.enrollments * course.price).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{course.rating?.average ? course.rating.average.toFixed(1) : 'N/A'}</span>
                      {course.rating?.count > 0 && (
                        <span className="text-sm text-gray-500 ml-1">({course.rating.count})</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {course.completionRate ? `${course.completionRate.toFixed(1)}%` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AdminAnalytics;
