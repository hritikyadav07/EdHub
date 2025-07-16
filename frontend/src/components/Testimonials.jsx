import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Software Developer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "EdHub transformed my career. The courses are practical, engaging, and taught by industry experts. I landed my dream job just 3 months after completing the web development bootcamp!",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "UX Designer",
      company: "DesignStudio",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face",
      content: "The UI/UX course exceeded my expectations. The hands-on projects and feedback from instructors helped me build a portfolio that impressed employers. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "David Chen",
      role: "Data Scientist",
      company: "DataFlow Inc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "As someone transitioning into data science, EdHub provided exactly what I needed. The Python course was comprehensive and the community support was incredible.",
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative z-10 mt-10">
      {/* Decorative Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 dark:text-yellow-300 opacity-20"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{ opacity: 0.3, scale: 1, rotate: 360 }}
            transition={{ 
              delay: i * 0.1,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 3
            }}
            viewport={{ once: true }}
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${5 + (i % 3) * 10}%`,
              fontSize: i % 3 === 0 ? '16px' : i % 3 === 1 ? '12px' : '8px'
            }}
          >
            ⭐
          </motion.div>
        ))}
        
        {/* Additional scattered stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-blue-400 dark:text-blue-300 opacity-15"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.25, scale: 1 }}
            transition={{ 
              delay: 0.5 + i * 0.15,
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 4
            }}
            viewport={{ once: true }}
            style={{
              right: `${5 + (i * 12)}%`,
              top: `${3 + (i % 4) * 8}%`,
              fontSize: i % 2 === 0 ? '10px' : '6px'
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-150px" }}
          className="text-center mb-16 relative"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Students Say</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Real stories from real students who transformed their careers with EdHub
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 30 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ 
                delay: 0.8 + index * 0.25, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -15,
                scale: 1.03,
                rotateX: -2,
                transition: { duration: 0.3 }
              }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group relative"
            >
              {/* Quote Icon */}
              <motion.div 
                className="absolute top-6 right-6 text-4xl text-blue-200 dark:text-blue-800 group-hover:text-blue-400 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.25 + 0.3, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
                "
              </motion.div>

              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: 180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.8 + index * 0.25 + 0.4 + i * 0.1, 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300
                    }}
                    viewport={{ once: true }}
                    className="text-yellow-400 text-xl"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* Content */}
              <motion.p 
                className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.25 + 0.6, 
                  duration: 0.6 
                }}
                viewport={{ once: true }}
              >
                {testimonial.content}
              </motion.p>

              {/* Author */}
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.25 + 0.8, 
                  duration: 0.6 
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.25 + 0.9, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </motion.div>
                <div>
                  <motion.div 
                    className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.8 + index * 0.25 + 1, 
                      duration: 0.4 
                    }}
                    viewport={{ once: true }}
                  >
                    {testimonial.name}
                  </motion.div>
                  <motion.div 
                    className="text-gray-600 dark:text-gray-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.8 + index * 0.25 + 1.1, 
                      duration: 0.4 
                    }}
                    viewport={{ once: true }}
                  >
                    {testimonial.role} at {testimonial.company}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl"
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Success Story?
          </motion.h3>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join thousands of students who have already transformed their careers
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.6, type: "spring", stiffness: 150 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full text-lg hover:shadow-lg transition-all duration-300"
          >
            Start Learning Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
