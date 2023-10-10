"use client";

import React, { useState } from "react";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";

import Heading from "@/components/Heading";
import { svgBgColor, svgColor } from "@/lib/SvgColors";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/shadcn-ui/ui/form";
import { Input } from "@/shadcn-ui/ui/input";
import { Button } from "@/shadcn-ui/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

export default function ConversationPage() {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      // ToDo: Open Pro Modal
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong!");
        console.log(error);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced chat bot."
        icon={MessageSquare}
        iconColor={svgColor.conversation}
        bgColor={svgBgColor.conversation}
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10 ">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={loading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full "
                disabled={loading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {loading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !loading && (
            <Empty label="No Conversation Started..." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
