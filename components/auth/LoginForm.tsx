'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { LoginSchema, RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import SocialIcons from '../ui/socialIcons';

interface RegisterFormProps {
  variant: string;
  toggleVariant: () => void;
}

const RegisterForm = ({ variant, toggleVariant }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    form.reset();
    // do action for register
  };

  if (variant !== 'LOGIN') return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='example@example.com'
                  {...field}
                  type='email'
                />
              </FormControl>
              <FormDescription>
                This is your public display email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='******' {...field} type='password' />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit'>
          Sign in
        </Button>

        <SocialIcons />
      </form>
      <p className='text-sm py-4 text-neutral-500 text-center'>
        {"Don't have an account yet?"}{' '}
        <button className=' font-bold text-black' onClick={toggleVariant}>
          Register now
        </button>
      </p>
    </Form>
  );
};

export default RegisterForm;
