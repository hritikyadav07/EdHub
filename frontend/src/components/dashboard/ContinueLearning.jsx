import React from 'react'
import { Link } from 'react-router-dom'

const CourseProgress = ({ course }) => {
  const progressPercentage = course.progress || 0
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-3">
              by {course.instructor}
            </p>
            <div className="flex items-center space-x-2 text-base text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>~{course.duration || '8h'} remaining</span>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700 transition-colors">
              Continue
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-base rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Details
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-base">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="text-base font-medium text-blue-900 dark:text-blue-100">
              Next: {course.nextLesson}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContinueLearning = ({ enrolledCourses }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Continue Learning</h2>
        <Link to="/courses" className="text-base text-blue-600 hover:text-blue-700 font-medium">
          View All Courses →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => (
          <CourseProgress key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default ContinueLearning
