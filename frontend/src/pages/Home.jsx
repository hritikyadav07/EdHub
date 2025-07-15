import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import PopularCourses from '../components/PopularCourses'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'

function Home() {
  return (
    <>
      <Hero/>
      <Features/>
      <PopularCourses/>
      <Stats/>
      <Testimonials/>
    </>
  )
}

export default Home
