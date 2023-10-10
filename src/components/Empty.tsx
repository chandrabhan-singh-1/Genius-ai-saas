import React from "react";
import Image from "next/image";

interface EmptyProps {
  label: string;
}

export default function Empty({ label }: EmptyProps) {
  return (
    <div className="h-full p-10 flex flex-col items-center justify-center ">
      <div className="relative h-72 w-72">
        <Image fill alt="Empty" src={"/empty.png"} sizes="inherit" priority />
      </div>
      <p className="text-muted-foreground text-sm text-center ">{label}</p>
    </div>
  );
}
