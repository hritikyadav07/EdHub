import React from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  CurrencyDollarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12%',
      icon: UserGroupIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Courses',
      value: '156',
      change: '+8%',
      icon: BookOpenIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue',
      value: '$89,247',
      change: '+23%',
      icon: CurrencyDollarIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'Enrollments',
      value: '4,892',
      change: '+15%',
      icon: ChartBarIcon,
      color: 'bg-orange-500'
    }
  ]

  const recentCourses = [
    { id: 1, title: 'Advanced React Development', students: 245, status: 'Active', revenue: '$4,890' },
    { id: 2, title: 'Python for Data Science', students: 189, status: 'Active', revenue: '$3,780' },
    { id: 3, title: 'UI/UX Design Masterclass', students: 167, status: 'Draft', revenue: '$3,340' },
    { id: 4, title: 'Node.js Backend Development', students: 134, status: 'Active', revenue: '$2,680' },
    { id: 5, title: 'Machine Learning Basics', students: 198, status: 'Active', revenue: '$3,960' }
  ]

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', joinDate: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', joinDate: '2024-01-13' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Student', joinDate: '2024-01-12' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Instructor', joinDate: '2024-01-11' }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Here's what's happening with your platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Courses
                </h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Course</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course.students} students • {course.revenue}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {course.status}
                      </span>
                      <div className="flex space-x-1">
                        <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Users
                </h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <PlusIcon className="h-4 w-4" />
                  <span>Add User</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Instructor' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {user.role}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Joined {user.joinDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-left transition-colors">
              <BookOpenIcon className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">Create New Course</h3>
              <p className="text-sm opacity-90">Add a new course to the platform</p>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-left transition-colors">
              <UserGroupIcon className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-sm opacity-90">View and manage user accounts</p>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-left transition-colors">
              <ChartBarIcon className="h-8 w-8 mb-2" />
              <h3 className="font-semibold">View Analytics</h3>
              <p className="text-sm opacity-90">Check platform performance</p>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
