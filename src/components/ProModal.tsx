" use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/shadcn-ui/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/shadcn-ui/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Check,
  Zap,
} from "lucide-react";
import { svgBgColor, svgColor } from "../lib/SvgColors";
import { Card } from "@/shadcn-ui/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn-ui/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: svgColor.conversation,
    bgColor: svgBgColor.conversation,
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: svgColor.image,
    bgColor: svgBgColor.image,
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: svgColor.video,
    bgColor: svgBgColor.video,
  },
  {
    label: "Music Generation",
    icon: Music,
    color: svgColor.music,
    bgColor: svgBgColor.music,
  },
  {
    label: "Code Generation",
    icon: Code,
    color: svgColor.code,
    bgColor: svgBgColor.code,
  },
];

export default function ProModal() {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("STRIPE CLIENT ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to Genius
                <Badge variant={"premium"} className="uppercase text-sm py-1">
                  Pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className="flex itemc-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md ", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm lg:text-lg ml-4 self-center font-mono">
                      {tool.label}
                    </div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={onSubscribe}
              size={"lg"}
              variant={"premium"}
              className="w-full"
            >
              Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
