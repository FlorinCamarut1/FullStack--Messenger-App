"use client";
import useConversation from "@/hooks/useConversation";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MessageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { HiPhoto } from "react-icons/hi2";

const ConversationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { conversationId } = useConversation();

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof MessageSchema>) => {
    startTransition(() => {});
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full items-center gap-2 border-t bg-white  px-4 py-4 lg:gap-4"
      >
        <HiPhoto size={30} className="text-sky-500" />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="type a message..."
                  {...field}
                  type="text"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="" type="submit" disabled={isPending}>
          Send message
        </Button>
      </form>
    </Form>
  );
};

export default ConversationForm;
