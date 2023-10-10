"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Music } from "lucide-react";
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
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

export default function MusicPage() {
  const router = useRouter();
  const proModal = useProModal();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);

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
        title="Music Generation"
        description="Generate music of your own interest..."
        icon={Music}
        iconColor={svgColor.music}
        bgColor={svgBgColor.music}
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
                        placeholder="Piano solo"
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
        <div className="space-y-4 mt-4 w-full">
          {loading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {!music && !loading && <Empty label="No Music Generated!" />}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}
