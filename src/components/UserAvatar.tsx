import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn-ui/ui/avatar";
import { useUser } from "@clerk/nextjs";
import React from "react";

export default function UserAvatar() {
  const { user } = useUser();

  return (
    <Avatar className="h-8 w-8 ">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
