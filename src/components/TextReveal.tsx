"use client";
import React from "react";
import { TextRevealCard } from "@/components/ui/text-reveal-card";

interface Props {
  text: string;
  revealText: string;
}

export function TextReveal({ text, revealText }: Props) {
  return (
    <div className="text-center font-poppins text-7xl">
      <TextRevealCard text={text} revealText={revealText}></TextRevealCard>
    </div>
  );
}
