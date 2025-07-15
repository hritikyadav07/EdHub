import React from 'react'
// eslint-disable-next-line no-unused-vars
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
    <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden -mt-10 pt-20 -mb-10 pb-20">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Diagonal Lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.08) 50%, transparent 52%)',
          backgroundSize: '100px 100px'
        }}></div>
        
        {/* Floating Circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-400/10 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-purple-400/8 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-400/12 rounded-full"></div>
      </div>

      {/* Cascading Animation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-150px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Impact</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Numbers that speak for our commitment to quality education
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.8 + index * 0.2, 
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -12,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="text-center group"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.2 + 0.2, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.color} mb-6 text-3xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                {stat.icon}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8 + index * 0.2 + 0.4, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150
                }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300"
              >
                {stat.number}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.2 + 0.6, 
                  duration: 0.5 
                }}
                viewport={{ once: true }}
                className="text-blue-200 text-lg font-medium"
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.4, duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-xl text-blue-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join our growing community of learners today!
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.6, type: "spring", stiffness: 150 }}
            viewport={{ once: true }}
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
