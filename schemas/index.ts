import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid Email format!" })
    .min(1, { message: "Email is required!" }),
  password: z
    .string()
    .min(6, { message: "Password too short (min. 6 characters)!" }),
});
export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email format!" })
    .min(1, { message: "Email is required!" }),
  password: z
    .string()
    .min(6, { message: "Password too short (min. 6 characters)!" }),
});

export const MessageSchema = z.object({
  message: z.string().min(1),
  image: z.string().optional(),
});

export const SettingsSchema = z.object({
  name: z.string().optional(),
  image: z.any().optional(),
});

export const GroupChatSchema = z.object({
  userId: z.string().optional(),
  name: z.string().optional(),
  members: z.array(z.any().nullish()).optional(),
  isGroup: z.boolean().optional(),
});
