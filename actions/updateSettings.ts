"use server";

import db from "@/lib/db";
import { SettingsSchema } from "@/schemas";

import * as z from "zod";
import { getCurrentUser } from "./getCurrentUser";

export const updateSettings = async (
  values: z.infer<typeof SettingsSchema>,
) => {
  const validatedFields = SettingsSchema.safeParse(values);

  const currentUser = await getCurrentUser();

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { image, name } = validatedFields.data;

  await db.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      name,
      image,
    },
  });

  return { success: "Data updated Succesfully!" };
};
