"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function About() {
  const { theme } = useTheme();
  
  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4`}>About EdHub</h1>
        <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>Empowering learners through quality education</p>
      </motion.div>
      
      <motion.section 
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : ''}`}>Our Mission</h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto text-center`}>
          At EdHub, we believe education should be accessible to everyone. 
          Our mission is to connect passionate instructors with eager learners, 
          creating a community where knowledge flows freely and opportunities abound.
        </p>
      </motion.section>
      
      <motion.section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img 
              src="https://via.placeholder.com/150" 
              alt="CEO"
              className="rounded-full w-32 h-32 mx-auto mb-4 object-cover" 
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img 
              src="https://via.placeholder.com/150" 
              alt="CTO"
              className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
            />
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>John Johnson</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>CTO</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <img 
              src="https://via.placeholder.com/150" 
              alt="Head of Content"
              className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
            />
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Lisa Chen</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Head of Content</p>
          </motion.div>
        </motion.div>
      </motion.section>
      
      <motion.section className="mb-16 bg-gray-50 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <motion.div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            EdHub began in 2025 with a simple idea: create a platform that makes
            learning enjoyable and effective. What started as a small collection of
            coding tutorials has grown into a comprehensive learning platform covering
            various subjects from programming to design, business to personal development.
          </p>
          <p className="text-lg text-gray-700">
            Today, we're proud to host thousands of courses created by experts from around
            the world, serving millions of students on their journey to mastery.
          </p>
        </motion.div>
      </motion.section>
      
      <motion.section className="mb-16">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <motion.div 
            className={`text-center py-8 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-card`}
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-primary-500 mb-2">5,000+</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Courses</p>
          </motion.div>
          <motion.div 
            className={`text-center py-8 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-card`}
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-primary-500 mb-2">500+</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Instructors</p>
          </motion.div>
          <motion.div 
            className={`text-center py-8 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-card`}
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-primary-500 mb-2">1M+</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Students</p>
          </motion.div>
          <motion.div 
            className={`text-center py-8 px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-card`}
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-primary-500 mb-2">50+</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Countries</p>
          </motion.div>
        </motion.div>
      </motion.section>
      
      <motion.section 
        className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-card p-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : ''}`}>Get In Touch</h2>
        <p className={`text-center text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
          Have questions or feedback? We'd love to hear from you!
        </p>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Email</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>contact@edhub.com</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Phone</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>+1 (555) 123-4567</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>Address</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>123 Learning Street, Education City, ED 12345</p>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default About;
