import React from 'react'

function Login() {
  return (
    <div className='bg-gray-700 h-screen'>
        <div className='flex justify-center items-center h-full'>
            <div className='bg-white p-10 rounded-lg w-120 '>
            <h1 className='text-2xl font-bold mb-5'>Login</h1>
            <form>
                <div className='mb-5'>
                <label htmlFor='username' className='block mb-2'>Username</label>
                <input type='text' id='username' className='w-full p-2 border border-gray-300 rounded-md' />
                </div>
                <div className='mb-5'>
                <label htmlFor='password' className='block mb-2'>Password</label>
                <input type='password' id='password' className='w-full p-2 border border-gray-300 rounded-md' />
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded-md'>Login</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Login