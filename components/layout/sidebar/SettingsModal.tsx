"use client";

import { updateSettings } from "@/actions/updateSettings";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { error } from "console";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { title } from "process";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}
const SettingsModal = ({
  isOpen,
  onClose,
  currentUser,
}: SettingsModalProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: currentUser?.name || undefined,
      image: currentUser?.image || undefined,
    },
  });
  const image = form.watch("image");

  const handleUpload = (result: any) => {
    form.setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      updateSettings(values).then((data) => {
        if (data?.error) {
          toast({
            title: "Error",
            variant: "destructive",
            description: data.error,
          });
        } else if (data?.success) {
          toast({ description: data.success });
          router.refresh();
        }
        onClose();
      });
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Profile
      </h2>
      <p className="mb-4 mt-1 text-sm leading-6 text-gray-600">
        Edit your public information.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className="mt-2 flex  items-center gap-x-3">
              <Image
                className="h-[48px] w-[48px] rounded-full object-cover"
                width="48"
                height="48"
                src={image || currentUser?.image || "/images/placeholder.png"}
                alt="Profile Image"
              />
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="stlfcouv"
                className="flex h-5 items-center justify-center rounded-lg bg-black p-4 text-white"
              >
                Change
              </CldUploadButton>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                disabled={isPending}
                variant="ghost"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={isPending} variant="default" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default SettingsModal;
