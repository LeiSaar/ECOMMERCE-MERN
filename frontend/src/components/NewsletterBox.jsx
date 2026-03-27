import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (e) =>{
       e.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
           Join us today — become a member and don’t miss out!
        </p>
        <form onSubmit = {onSubmitHandler} className='w-full sm:w-1/2 flex items-strech gap-3 mx-auto my-6 pl-3'>
            <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none border round-md' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 round-md'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox