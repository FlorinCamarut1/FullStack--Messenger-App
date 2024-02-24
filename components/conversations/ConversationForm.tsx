"use client";

import useConversation from "@/hooks/useConversation";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { MessageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiPhoto } from "react-icons/hi2";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { sendMessage } from "@/actions/sendMessage";
import { useToast } from "../ui/use-toast";
import { CldUploadButton } from "next-cloudinary";

import * as z from "zod";
import { uploadImage } from "@/actions/uploadImage";

const ConversationForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const { conversationId } = useConversation();

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });
  const messageLength = form.control._formValues.message?.length > 0;

  const onSubmit = useCallback(
    (values: z.infer<typeof MessageSchema>) => {
      startTransition(() => {
        sendMessage(values, conversationId).then((data) => {
          if (data?.error) {
            toast({
              title: "ERROR",
              description: data?.error,
              variant: "destructive",
            });
          } else if (data?.success) {
            form.reset();
          }
        });
      });
    },
    [conversationId, form, toast],
  );

  const handleUpload = (result: any) => {
    const image = result?.info?.secure_url;

    startTransition(() => {
      uploadImage(image, conversationId);
    });
    // axios.post("/api/messages", {
    //   image: result?.info?.secure_url,
    //   conversationId,
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex w-full items-center justify-center gap-2 border-t  bg-white px-4 py-4 lg:gap-4"
      >
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="stlfcouv"
        >
          <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
        <FormField
          disabled={isPending}
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="rounded-full bg-neutral-100"
                  disabled={isPending}
                  placeholder="type a message..."
                  {...field}
                  type="text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {messageLength && (
          <button
            className="rounded-full p-2 text-sky-500 transition hover:scale-125 hover:bg-neutral-100 active:scale-75"
            type="submit"
            disabled={isPending}
          >
            <PiPaperPlaneTiltFill size={30} />
          </button>
        )}
      </form>
    </Form>
  );
};

export default ConversationForm;
