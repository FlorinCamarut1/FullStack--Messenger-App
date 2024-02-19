"use server";

import { auth } from "@/auth";

import db from "@/lib/db";

export const getCurrentUser = async () => {
  try {
    const session = await auth();
    const currentUser = session?.user;

    if (!currentUser) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email: currentUser.email as string,
      },
    });
    if (!user) return null;

    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
