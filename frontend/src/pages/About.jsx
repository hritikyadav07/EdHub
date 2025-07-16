import React from 'react'
import { motion } from 'framer-motion'

function About() {
  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <section className="pt-36   bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 pt-12 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About EdHub</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Empowering learners worldwide through innovative online education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600  mb-6">
                At EdHub, we believe that quality education should be accessible to everyone, everywhere. 
                Our mission is to democratize learning by providing world-class courses taught by industry experts.
              </p>
              <p className="text-lg text-gray-600 ">
                We're committed to helping millions of students worldwide achieve their learning goals 
                and advance their careers through our comprehensive online platform.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-8xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Focused Learning</h3>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Passionate educators and technologists working to transform online learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", expertise: "Education Technology", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Michael Chen", role: "Head of Content", expertise: "Data Science", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Emma Wilson", role: "Lead Designer", expertise: "UI/UX Design", img: "https://randomuser.me/api/portraits/women/68.jpg" }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-400"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
