import React from 'react'

function Navbar() {
  return (
    <div className='flex bg-slate-800'>
        <div className='flex-none text-white mx-16 pb-10 '>
            <p className='text-3xl font-bold mt-5'>EdHub
              {/* Rectangular "dot" */}
              <span
                className='inline-block align-middle bg-blue-700'
                style={{
                  width: '5px',
                  height: '5px',
                  marginLeft: '4px',
                  marginBottom: '6px',
                  verticalAlign: 'bottom',
                }}
              ></span>
            </p>
            <span className='text-blue-400 text-sm font-normal my-10'>Learn and Teach</span>
        </div>
        <div className='flex-1 flex-row mx-16  my-6'>
            <div className=' flex justify-end mb-3'>
            <button className='px-8 text-white'>Login</button>
            <button className='bg-blue-600 text-white px-10 py-2 '>Enroll Now</button>
            </div>
            <ul className='flex justify-end mt-2'>
                <li className='inline-block mx-10 text-white'>Who we are</li>
                <li className='inline-block mx-10 text-white'>Learning Modules</li>
                <li className='inline-block mx-10 text-white'>Resources</li>
                <li className='inline-block mx-10 text-white'>Our Team</li>
                <li className='inline-block ml-10 text-white'>Contact </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar