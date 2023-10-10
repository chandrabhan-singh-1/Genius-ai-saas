"use client";

import { maxFreeCounts } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/shadcn-ui/ui/button";
import { Card, CardContent } from "@/shadcn-ui/ui/card";
import { Progress } from "@/shadcn-ui/ui/progress";
import { Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function FreeCounter({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6 flex flex-col justify-center ">
          <div className=" text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount}/{maxFreeCounts} Free Generations
            </p>
            <Progress
              value={(apiLimitCount / maxFreeCounts) * 100}
              className="h-3"
            />
          </div>
          <Button onClick={proModal.onOpen} variant={"premium"}>
            Upgrad
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
