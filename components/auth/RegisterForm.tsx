"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
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
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { useVariant } from "@/context/variant-context";

import FormError from "../ui/form-error";
import FormSucces from "../ui/form-success";

const RegisterForm = () => {
  const { variant, toggleVariant } = useVariant();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });

    form.reset();
    // do action for register
  };

  if (variant !== "REGISTER") return null;

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex:John Doe"
                  {...field}
                  type="text"
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
          Submit
        </Button>
      </form>
      <p className="py-4 text-center text-sm text-neutral-500">
        Alredy have an accoun?{" "}
        <button className="font-bold text-black" onClick={toggleVariant}>
          Login now
        </button>
      </p>
    </Form>
  );
};

export default RegisterForm;
