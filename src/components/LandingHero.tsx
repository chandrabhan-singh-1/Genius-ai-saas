"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { Button } from "@/shadcn-ui/ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-800 p-2">
          <Typewriter
            words={[
              "ChatBot",
              "Image Generator",
              "Music Generator",
              "Video Generator",
              "Code Generator",
            ]}
            loop={true}
            // cursor
            // cursorStyle="_"
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={1000}
          />
          |
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-sm md:text-xl font-light text-zinc-400">
          Create content 10x faster using AI
        </div>
        <div>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button
              variant={"premium"}
              className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
            >
              Start Generating for Free
            </Button>
          </Link>
        </div>
        <div className="text-zinc-400 text-sm md:text-sm font-normal">
          Payment details are not required!
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
