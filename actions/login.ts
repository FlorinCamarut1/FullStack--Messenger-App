'use server';

import { getUserByEmail } from '@/data';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import * as z from 'zod';
import { DEFAULT_LOGIN_ROUTE } from '@/Routes';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword)
    return { error: 'No user matches this credentials!' };

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_ROUTE,
    });
    return { success: 'Logged in succesfully!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
