"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn-ui/ui/sheet";
import Sidebar from "@/components/Sidebar";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function MobileSidebar({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <span className="md:hidden h-5 w-5 rounded-md hover:bg-gray-200">
          <Menu />
        </span>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
}
