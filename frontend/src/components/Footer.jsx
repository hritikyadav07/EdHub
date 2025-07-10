import React from 'react'

function Footer() {
return (
    <>
    <footer className="bg-slate-800 px-16 py-6">
        <div className="flex items-start">
            <div className='flex-1  text-white  ml-16 pb-10  '>
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
                <div className='text-blue-400 text-sm font-normal mb-20'>Learn and Teach</div>
                <p className='text-6xl my-10'>Join The Success!</p>
                <button className='border-2 px-16 py-4 text-xm '>Enroll Now</button>
            </div>
            <div className="w-px bg-gray-300 h-100 mx-4"></div>
            <div className="flex-1 pl-20 py-20 text-white ">
                <div className='text-2xl'>Info</div>
                <div className='text-xm'>+91 8923539856</div>
                <div className='text-xm mb-10'>edhub@official.com</div>
                <div className='text-2xl'>Follow</div>
                <div href='www.instagram.com/edhub' className='text-xm w-full'>Instagram</div>
                <div href='ww.twitter.com/edhub' className='text-xm'>Twitter</div>
                <div href='ww.twitter.com/edhub' className='text-xm'>Facebook</div>
            </div>
        </div>
    </footer>
        <p className="bg-white px-16 my-6 text-xs">&copy; {new Date().getFullYear()} EdHub. All rights reserved.</p>
    </>
)
}

export default Footer