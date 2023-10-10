import { Avatar, AvatarImage } from "@/shadcn-ui/ui/avatar";
import React from "react";

export default function BotAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src={"/logo.png"} />
    </Avatar>
  );
}
