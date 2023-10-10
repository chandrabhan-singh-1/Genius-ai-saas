"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Download, ImageIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";

import Heading from "@/components/Heading";
import { svgBgColor, svgColor } from "@/lib/SvgColors";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/shadcn-ui/ui/form";
import { Input } from "@/shadcn-ui/ui/input";
import { Button } from "@/shadcn-ui/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn-ui/ui/select";
import { Card, CardFooter } from "@/shadcn-ui/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

export default function ImagePage() {
  const router = useRouter();
  const proModal = useProModal();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

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
        title="Image Generation"
        description="Turn your thoughts into images..."
        icon={ImageIcon}
        iconColor={svgColor.image}
        bgColor={svgBgColor.image}
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
                  <FormItem className="col-span-12 lg:col-span-6 ">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={loading}
                        placeholder="A picture of a horse in swiss alps..."
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"amount"}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"resolution"}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="p-20">
              <Loader />
            </div>
          )}

          {images.length === 0 && !loading && (
            <Empty label="No Images Generated!." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden ">
                <div className="relative aspect-square ">
                  <Image src={src} alt="Image" fill sizes="inherit" />
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    variant={"secondary"}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
