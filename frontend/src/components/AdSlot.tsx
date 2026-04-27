"use client";

import { Megaphone } from "lucide-react";

type AdSlotProps = {
  label?: string;
  size?: "leaderboard" | "sidebar" | "inline";
};

const sizeClass = {
  leaderboard: "min-h-[96px]",
  sidebar: "min-h-[280px]",
  inline: "min-h-[160px]",
};

export default function AdSlot({ label = "Advertisement", size = "sidebar" }: AdSlotProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50/90 p-4 text-slate-400 ${sizeClass[size]}`}
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-300 shadow-sm">
          <Megaphone size={20} />
        </span>
        <span className="text-xs font-black uppercase tracking-wide">{label}</span>
      </div>
    </div>
  );
}
