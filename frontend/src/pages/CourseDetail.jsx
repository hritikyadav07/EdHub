import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

function CourseDetail() {
  const { id } = useParams()

  // Mock course data (in real app, this would come from API)
  const course = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    instructorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    students: 12543,
    price: 89,
    originalPrice: 129,
    category: "Web Development",
    level: "Beginner",
    duration: "40 hours",
    lessons: 156,
    language: "English",
    lastUpdated: "December 2024",
    description: "Master web development from scratch with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js and build amazing projects.",
    whatYouWillLearn: [
      "Build responsive websites with HTML5 and CSS3",
      "Master JavaScript and ES6+ features",
      "Create interactive applications with React",
      "Build backend APIs with Node.js and Express",
      "Work with databases (MongoDB and SQL)",
      "Deploy applications to the cloud",
      "Use Git and GitHub for version control",
      "Build a complete full-stack project portfolio"
    ],
    requirements: [
      "No prior programming experience required",
      "A computer with internet connection",
      "Willingness to learn and practice"
    ],
    curriculum: [
      {
        section: "HTML & CSS Fundamentals",
        lessons: 25,
        duration: "8 hours"
      },
      {
        section: "JavaScript Mastery",
        lessons: 35,
        duration: "12 hours"
      },
      {
        section: "React Development",
        lessons: 45,
        duration: "15 hours"
      },
      {
        section: "Backend with Node.js",
        lessons: 30,
        duration: "10 hours"
      },
      {
        section: "Database & Deployment",
        lessons: 21,
        duration: "7 hours"
      }
    ]
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{course.category}</span>
                  <span className="px-3 py-1 bg-orange-500 rounded-full text-sm">Bestseller</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {course.title}
                </h1>
                
                <p className="text-xl mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-blue-100">({course.students.toLocaleString()} students)</span>
                  </div>
                  <div className="text-blue-100">
                    Created by {course.instructor}
                  </div>
                  <div className="text-blue-100">
                    Last updated {course.lastUpdated}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <span>🎯</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌐</span>
                    <span>{course.language}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl"
              >
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📚</div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      ${course.price}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      ${course.originalPrice}
                    </div>
                  </div>
                  <div className="text-green-600 font-medium">
                    31% off
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg mb-4 hover:shadow-lg transition-all duration-300"
                >
                  Enroll Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-lg mb-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  Add to Cart
                </motion.button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                  30-Day Money-Back Guarantee
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>📱</span>
                    <span>Mobile and TV access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏆</span>
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>♾️</span>
                    <span>Lifetime access</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  What you'll learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Course Curriculum */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Course Content
                </h2>
                <div className="space-y-4">
                  {course.curriculum.map((section, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {section.section}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {section.lessons} lessons • {section.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Instructor */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Your Instructor
                </h2>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    SJ
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{course.instructor}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Senior Web Developer</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span>⭐</span>
                    <span>4.9 instructor rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🎓</span>
                    <span>50,000+ students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>15 courses</span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Sarah is a senior web developer with 8+ years of experience building scalable web applications. 
                  She has worked with companies like Google and Microsoft and is passionate about teaching.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CourseDetail
