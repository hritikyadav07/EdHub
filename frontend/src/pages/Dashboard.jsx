import React from 'react'
import { motion } from 'framer-motion'

function Dashboard() {
  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      progress: 75,
      instructor: "Sarah Johnson",
      nextLesson: "React Hooks Deep Dive"
    },
    {
      id: 2,
      title: "Data Science with Python",
      progress: 45,
      instructor: "Dr. Michael Chen", 
      nextLesson: "Machine Learning Basics"
    }
  ]

  const certificates = [
    {
      id: 1,
      course: "UI/UX Design Complete Course",
      completedDate: "2024-11-15",
      instructor: "Emma Wilson"
    }
  ]

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            My Learning Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enrolled Courses</h3>
              <p className="text-3xl font-bold text-blue-600">{enrolledCourses.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{certificates.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certificates</h3>
              <p className="text-3xl font-bold text-purple-600">{certificates.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hours Learned</h3>
              <p className="text-3xl font-bold text-orange-600">42</p>
            </div>
          </div>

          {/* Continue Learning */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">by {course.instructor}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Continue
                    </button>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Next: {course.nextLesson}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{cert.course}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">by {cert.instructor}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      Completed: {new Date(cert.completedDate).toLocaleDateString()}
                    </p>
                    <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      Download Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
