'use client';
import AuthForm from '@/components/auth/AuthForm';
import { VariantProvider, useVariant } from '@/context/variant-context';
import Image from 'next/image';
import React from 'react';

const HomePage = () => {
  const { variant } = useVariant();

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
          {variant === 'LOGIN'
            ? 'Sign in to your account'
            : 'Register your account'}
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default HomePage;
