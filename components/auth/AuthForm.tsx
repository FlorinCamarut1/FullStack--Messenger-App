'use client';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      console.log('Authenticated');
      router.push('/users');
    }
  }, [session?.status, router]);

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};

export default AuthForm;
// test
