import AuthForm from '@/components/AuthForm';
import Image from 'next/image';
import React from 'react';

const HomePage = () => {
  return (
    <div className=' flex flex-col min-h-screen justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          className='mx-auto w-auto'
          src='/images/logo.png'
          alt='logo'
          height={48}
          width={48}
          priority
        />
        <h2 className=' mt-6 text-center text-3xl  font-bold tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default HomePage;
