import { UserButton } from "@clerk/nextjs";
import React from "react";
import MobileSidebar from "./MobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export default async function Navbar() {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4 bg-gray-800 mb-8">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
