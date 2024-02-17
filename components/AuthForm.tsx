'use client';

import { useCallback, useState } from 'react';

import RegisterForm from './auth/RegisterForm';
import LoginForm from './auth/LoginForm';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <LoginForm variant={variant} toggleVariant={toggleVariant} />
        <RegisterForm variant={variant} toggleVariant={toggleVariant} />
      </div>
    </div>
  );
};

export default AuthForm;
