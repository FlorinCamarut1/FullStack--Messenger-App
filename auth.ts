import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import authConfig from './auth.config';

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;
      return true;
    },

    async session({ token, session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
});
