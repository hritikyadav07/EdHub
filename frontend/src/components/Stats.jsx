import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'


const MovingGradient = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Static gradient background with purple corners */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(15,35,95,0.98) 0%, rgba(10,20,65,0.99) 40%, rgba(0,10,45,1) 70%, rgba(0,5,25,1) 100%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Purple corner gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-gradient-to-br from-purple-900/30 via-purple-800/10 to-transparent" />
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-indigo-900/30 via-purple-800/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-purple-900/30 via-purple-800/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-gradient-to-tl from-indigo-900/30 via-purple-800/10 to-transparent" />
      </div>

      {/* Royal blue accent layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a237e]/10 to-transparent" />

      {/* Glass overlay with royal blue tint */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-[#1a237e]/5 to-black/10" />

      {/* Static light streaks */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(65,105,225,0.03) 200px, transparent 300px)',
          backgroundSize: '200% 200%',
          backgroundPosition: 'center'
        }}
      />

      {/* Royal blue grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(65,105,225,0.03) 1px, transparent 0)',
        backgroundSize: '30px 30px'
      }} />
      
      {/* Dark overlay with royal blue and purple tint */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a1232]/70 via-[#0a1232]/70 to-[#1a1040]/70" />
    </div>
  );
};

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
    <section className="py-20 relative overflow-hidden -mt-10 pt-20 -mb-10 pb-20">
      <MovingGradient />

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
