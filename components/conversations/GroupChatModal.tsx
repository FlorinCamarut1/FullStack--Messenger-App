"use client";

import { GroupChatSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
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
import { startConversation } from "@/actions/startConversation";

import Modal from "../ui/Modal";
import Select from "../ui/Select";
import { toast } from "../ui/use-toast";
import LoadingModal from "../ui/LoadingModal";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof GroupChatSchema>>({
    resolver: zodResolver(GroupChatSchema),
    defaultValues: {
      name: "",
      members: [],
      isGroup: true,
    },
  });

  const onSubmit = (values: z.infer<typeof GroupChatSchema>) => {
    startTransition(() => {
      startConversation(values).then((data) => {
        if (!data) {
          toast({
            variant: "destructive",
            description: "Could not create this group!",
          });
        }
        toast({ description: "Group created Succesfully!" });
        router.refresh();
        onClose();
      });
    });
  };

  const members = form.watch("members");

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: Group"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Create a chat with more than 2 people
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Select
                label="Members"
                disabled={isPending}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  form.setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Create group
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default GroupChatModal;
