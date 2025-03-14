import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
function Main() {
const { theme } = useTheme();

return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">EdHub Learning Platform</h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Expand your skills with our expert-led courses</p>
        </header>
        
        <motion.section className="mb-12">
            <div className={`${theme === 'dark' ? 'bg-blue-800' : 'bg-blue-600'} text-white rounded-lg p-8 shadow-lg`}>
                <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey Today</h2>
                <p className="mb-6">Access hundreds of courses in programming, design, business, and more.</p>
                <Link to='/courses' className={`${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-blue-600 hover:bg-gray-100'} px-6 py-2 rounded-md font-semibold transition`}>
                    Browse Courses
                </Link>
            </div>
        </motion.section>
        
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className={`border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                        <div className={`h-40 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        <div className="p-4">
                            <h3 className="font-bold text-xl mb-2">Course Title {item}</h3>
                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Learn essential skills with our expert instructors.</p>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-primary-500">$49.99</span>
                                <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
        
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
                    <div className="text-4xl mb-4 text-primary-500">📚</div>
                    <h3 className="font-bold text-xl mb-2">Quality Content</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Expert-crafted courses designed for real-world skills.</p>
                </div>
                <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
                    <div className="text-4xl mb-4 text-primary-500">🎓</div>
                    <h3 className="font-bold text-xl mb-2">Learn Anywhere</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Access your courses on any device, anytime.</p>
                </div>
                <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
                    <div className="text-4xl mb-4 text-primary-500">🏆</div>
                    <h3 className="font-bold text-xl mb-2">Certification</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Earn certificates to showcase your new skills.</p>
                </div>
            </div>
        </motion.section>
    </div>
)
}

export default Main