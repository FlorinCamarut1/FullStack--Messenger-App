"use server";

import { auth } from "@/auth";

import db from "@/lib/db";

export const getUsers = async () => {
  const session = await auth();

  if (!session?.user) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    if (!users) return [];

    return users;
  } catch (err) {
    console.log(err);
    return null;
  }
};
