"use client";
import React from "react";
import { SparklesCore } from "../components/ui/sparkles";

export function SparksBG() {
  return (
    <>
      <div className="pointer-events-none fixed -z-20 h-screen w-full bg-black">
        <div className="fixed -z-10 h-full  w-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        </div>
      </div>
    </>
  );
}
