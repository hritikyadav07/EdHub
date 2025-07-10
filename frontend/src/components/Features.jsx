import React from 'react'
import { motion } from 'framer-motion'

function Features() {
  const features = [
    {
      icon: "🎯",
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience"
    },
    {
      icon: "⚡",
      title: "Interactive Learning",
      description: "Engage with hands-on projects, quizzes, and interactive content"
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access your courses anywhere, anytime from any device"
    },
    {
      icon: "🏆",
      title: "Certificates",
      description: "Earn industry-recognized certificates upon course completion"
    },
    {
      icon: "👥",
      title: "Community",
      description: "Connect with fellow learners and build your professional network"
    },
    {
      icon: "🔄",
      title: "Lifetime Access",
      description: "Get lifetime access to course materials and future updates"
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EdHub</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide everything you need to accelerate your learning journey and achieve your goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
