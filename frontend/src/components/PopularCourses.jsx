import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function PopularCourses() {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 12543,
      price: 89,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      category: "Web Development",
      duration: "40 hours"
    },
    {
      id: 2,
      title: "Data Science with Python",
      instructor: "Dr. Michael Chen",
      rating: 4.8,
      students: 8765,
      price: 79,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      category: "Data Science",
      duration: "35 hours"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Wilson",
      rating: 4.9,
      students: 6789,
      price: 69,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      category: "Design",
      duration: "25 hours"
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "James Rodriguez",
      rating: 4.7,
      students: 9876,
      price: 59,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "Marketing",
      duration: "30 hours"
    }
  ]

  return (
    <section id="courses" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        {/* Primary Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30px 30px, rgba(59, 130, 246, 0.12) 2px, transparent 0)',
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Secondary Dot Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 15px 15px, rgba(147, 51, 234, 0.08) 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Diagonal Lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.04) 50%, transparent 52%)',
          backgroundSize: '120px 120px'
        }}></div>
        
        {/* Cross Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, transparent 48%, rgba(147, 51, 234, 0.03) 50%, transparent 52%), linear-gradient(0deg, transparent 48%, rgba(147, 51, 234, 0.03) 50%, transparent 52%)',
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Circles */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-40 w-28 h-28 bg-green-500/10 rounded-full blur-sm"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.18, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-60 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg rotate-45"
          animate={{
            rotate: [45, 225, 45],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-40 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-10 w-6 h-20 bg-gradient-to-b from-blue-500/8 to-transparent rounded-full"
          animate={{
            scaleY: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-transparent rounded-br-full"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-green-500/5 to-transparent rounded-tr-full"></div>
        <div className="absolute bottom-0 right-0 w-44 h-44 bg-gradient-to-tl from-pink-500/5 to-transparent rounded-tl-full"></div>
        
        {/* Subtle Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/3 rounded-full blur-3xl"></div>
        
        {/* Animated Border Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Educational Theme Elements */}
        <motion.div
          className="absolute top-16 right-16 text-4xl opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-16 text-3xl opacity-10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎓
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-8 text-2xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          💡
        </motion.div>
      </div>

      {/* Content with higher z-index */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Popular <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of students in our most popular courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48  flex items-center justify-center"
                style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('${course.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              >
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-blue-600 text-sm font-medium rounded-full">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/50 text-white text-sm font-medium rounded-full">
                    {course.duration}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  by {course.instructor}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{course.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({course.students.toLocaleString()})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{course.price}
                  </div>
                  <Link
                    to={`/course/${course.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg text-sm hover:shadow-lg transition-all duration-300"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-24 mb-12"
        >
          <Link
            to="/courses"
            className="px-8 py-4  border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-full text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            View All Courses
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PopularCourses
