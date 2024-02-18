'use server';

import { RegisterSchema } from '@/schemas';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { getUserByEmail } from '@/data';
import { error } from 'console';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, name, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return { error: 'Email already associated with an account!' };

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.create({
    data: {
      email,
      name,
      hashedPassword,
      createdAt: new Date(),
    },
  });

  return { success: 'User created succesfully!' };
};
