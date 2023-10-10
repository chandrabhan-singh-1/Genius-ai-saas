"use client";

import React, { useState } from "react";
import { Button } from "@/shadcn-ui/ui/button";
import { Zap } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Billing Error!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        disabled={loading}
        onClick={onClick}
        variant={isPro ? "default" : "premium"}
      >
        {isPro ? "Manage Subscription" : "Upgrade"}
        {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
