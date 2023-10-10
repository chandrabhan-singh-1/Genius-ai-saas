"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { svgColor } from "../lib/SvgColors";
import FreeCounter from "./FreeCounter";

const monsterrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: svgColor.dashboard,
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: svgColor.conversation,
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: svgColor.image,
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: svgColor.video,
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: svgColor.music,
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: svgColor.code,
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: svgColor.settings,
  },
];

export default function Sidebar({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-2 py-2 flex-1">
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-10">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src={"/logo.png"} sizes={"100"} />
          </div>
          <h1 className={cn("text-2xl font-bold", monsterrat.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-300"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3 ", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
}
