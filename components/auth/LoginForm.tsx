"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useVariant } from "@/context/variant-context";

import SocialIcons from "../ui/socialIcons";
import FormError from "../ui/form-error";
import FormSucces from "../ui/form-success";

const LoginForm = () => {
  const { variant, toggleVariant } = useVariant();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
    form.reset();
    // do action for register
  };

  if (variant !== "LOGIN") return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="example@example.com"
                  {...field}
                  type="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type="password"
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}
        {success && <FormSucces message={success} />}
        <Button className="w-full" type="submit" disabled={isPending}>
          Sign in
        </Button>

        <SocialIcons />
      </form>
      <p className="py-4 text-center text-sm text-neutral-500">
        {"Don't have an account yet?"}{" "}
        <button className=" font-bold text-black" onClick={toggleVariant}>
          Register now
        </button>
      </p>
    </Form>
  );
};

export default LoginForm;
