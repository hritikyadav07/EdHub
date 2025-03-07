import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
return (
    <div className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">EdHub Learning Platform</h1>
            <p className="text-xl text-gray-600">Expand your skills with our expert-led courses</p>
        </header>
        
        <section className="mb-12">
            <div className="bg-blue-600 text-white rounded-lg p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey Today</h2>
                <p className="mb-6">Access hundreds of courses in programming, design, business, and more.</p>
                <Link to='/courses' className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                    Browse Courses
                </Link>
            </div>
        </section>
        
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                        <div className="h-40 bg-gray-200"></div>
                        <div className="p-4">
                            <h3 className="font-bold text-xl mb-2">Course Title {item}</h3>
                            <p className="text-gray-600 mb-4">Learn essential skills with our expert instructors.</p>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-blue-600">$49.99</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                    <div className="text-4xl mb-4 text-blue-600">📚</div>
                    <h3 className="font-bold text-xl mb-2">Quality Content</h3>
                    <p className="text-gray-600">Expert-crafted courses designed for real-world skills.</p>
                </div>
                <div className="p-4">
                    <div className="text-4xl mb-4 text-blue-600">🎓</div>
                    <h3 className="font-bold text-xl mb-2">Learn Anywhere</h3>
                    <p className="text-gray-600">Access your courses on any device, anytime.</p>
                </div>
                <div className="p-4">
                    <div className="text-4xl mb-4 text-blue-600">🏆</div>
                    <h3 className="font-bold text-xl mb-2">Certification</h3>
                    <p className="text-gray-600">Earn certificates to showcase your new skills.</p>
                </div>
            </div>
        </section>
        
        <footer className="bg-gray-100 p-6 rounded-lg">
            <div className="text-center">
                <p className="text-gray-600 mb-2">© 2023 EdHub Learning Platform. All rights reserved.</p>
                <div className="flex justify-center gap-4">
                    <a href="#" className="text-blue-600 hover:underline">About</a>
                    <a href="#" className="text-blue-600 hover:underline">Contact</a>
                    <a href="#" className="text-blue-600 hover:underline">Terms</a>
                    <a href="#" className="text-blue-600 hover:underline">Privacy</a>
                </div>
            </div>
        </footer>
    </div>
)
}

export default Main