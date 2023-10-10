import Heading from "@/components/Heading";
import SubscriptionButton from "@/components/SubscriptionButton";
import { svgBgColor, svgColor } from "@/lib/SvgColors";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import React from "react";

export default async function SettingsPage() {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor={svgColor.settings}
        bgColor={svgBgColor.settings}
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm ">
          {isPro
            ? "You are currently on a Pro plan"
            : "You are currently on a Free plan"}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
}
