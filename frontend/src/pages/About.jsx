import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About EdHub</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Empowering learners through quality education</p>
      </div>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
          At EdHub, we believe education should be accessible to everyone. 
          Our mission is to connect passionate instructors with eager learners, 
          creating a community where knowledge flows freely and opportunities abound.
        </p>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="CEO"
              className="rounded-full w-32 h-32 mx-auto mb-4 object-cover" 
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="CTO"
              className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">John Johnson</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="text-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Head of Content"
              className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Lisa Chen</h3>
            <p className="text-gray-600">Head of Content</p>
          </div>
        </div>
      </section>
      
      <section className="mb-16 bg-gray-50 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            EdHub began in 2021 with a simple idea: create a platform that makes
            learning enjoyable and effective. What started as a small collection of
            coding tutorials has grown into a comprehensive learning platform covering
            various subjects from programming to design, business to personal development.
          </p>
          <p className="text-lg text-gray-700">
            Today, we're proud to host thousands of courses created by experts from around
            the world, serving millions of students on their journey to mastery.
          </p>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center py-8 px-4 bg-white rounded-lg shadow-card">
            <h3 className="text-3xl font-bold text-primary mb-2">5,000+</h3>
            <p className="text-gray-600">Courses</p>
          </div>
          <div className="text-center py-8 px-4 bg-white rounded-lg shadow-card">
            <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
            <p className="text-gray-600">Instructors</p>
          </div>
          <div className="text-center py-8 px-4 bg-white rounded-lg shadow-card">
            <h3 className="text-3xl font-bold text-primary mb-2">1M+</h3>
            <p className="text-gray-600">Students</p>
          </div>
          <div className="text-center py-8 px-4 bg-white rounded-lg shadow-card">
            <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
            <p className="text-gray-600">Countries</p>
          </div>
        </div>
      </section>
      
      <section className="bg-white rounded-lg shadow-card p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
        <p className="text-center text-lg text-gray-700 mb-8">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-gray-600">contact@edhub.com</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="text-gray-600">123 Learning Street, Education City, ED 12345</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
