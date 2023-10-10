"use client";

import React from "react";
import {
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/shadcn-ui/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { svgBgColor, svgColor } from "@/lib/SvgColors";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: svgColor.conversation,
    bgColor: svgBgColor.conversation,
    href: "/conversation",
  },
  {
    label: "Image",
    icon: ImageIcon,
    color: svgColor.image,
    bgColor: svgBgColor.image,
    href: "/image",
  },
  {
    label: "Video",
    icon: VideoIcon,
    color: svgColor.video,
    bgColor: svgBgColor.video,
    href: "/video",
  },
  {
    label: "Music",
    icon: Music,
    color: svgColor.music,
    bgColor: svgBgColor.music,
    href: "/music",
  },
  {
    label: "Code",
    icon: Code,
    color: svgColor.code,
    bgColor: svgBgColor.code,
    href: "/code",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="text-xl pb-10">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-forground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI Chatbot - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md ", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
