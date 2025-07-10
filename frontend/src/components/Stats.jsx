import React from 'react'
import { motion } from 'framer-motion'

function Stats() {
  const stats = [
    {
      number: "50,000+",
      label: "Active Students",
      icon: "👨‍🎓",
      color: "from-blue-500 to-purple-600"
    },
    {
      number: "1,200+",
      label: "Courses Available",
      icon: "📚",
      color: "from-green-500 to-blue-600"
    },
    {
      number: "150+",
      label: "Expert Instructors",
      icon: "👩‍🏫",
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "98%",
      label: "Completion Rate",
      icon: "🎯",
      color: "from-orange-500 to-red-600"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Numbers that speak for our commitment to quality education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.8 }
                }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.color} mb-6 text-3xl group-hover:shadow-2xl transition-shadow duration-300`}
              >
                {stat.icon}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300"
              >
                {stat.number}
              </motion.div>
              
              <div className="text-blue-200 text-lg font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-blue-100 mb-8">
            Join our growing community of learners today!
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-full text-lg hover:bg-gray-100 transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
