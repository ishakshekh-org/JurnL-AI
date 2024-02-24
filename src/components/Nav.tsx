"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function NavbarDemo() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <Navbar className="top-10 " />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { data: sessionData } = useSession();

  if (sessionData) {
    return (
      <div
        className={cn(
          "fixed inset-x-0 top-10 z-50 mx-auto max-w-md text-center",
          className,
        )}
      >
        <Menu setActive={setActive}>
          <div className="flex items-center">
            <Link
              href={"/"}
              className="bg-gradient-to-tr from-amber-500 to-cyan-400 bg-clip-text font-poppins text-xl font-semibold text-transparent sm:text-3xl"
            >
              Jurnl AI
            </Link>
          </div>

          <div className="flex items-center">
            <div className="sm:hidden">
              <MenuItem setActive={setActive} active={active} item="Options">
                <div className="flex flex-col items-center space-y-4 text-sm">
                  <HoveredLink href="/entries">Entries</HoveredLink>
                  <HoveredLink href="/write">Write</HoveredLink>
                  <button
                    onClick={() => void signOut()}
                    className="relative overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <span className="absolute inset-[-1000%]  animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-5 py-2 font-medium text-white backdrop-blur-3xl">
                      LogOut
                    </span>
                  </button>
                </div>
              </MenuItem>
            </div>
            <div className="flex items-center justify-between gap-5 max-sm:hidden">
              <Link href={"/entries"}>Entries</Link>
              <Link href={"/write"}>Write</Link>
              <button
                onClick={() => void signOut()}
                className="relative overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%]  animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer  rounded-full bg-gray-950 px-3  text-white backdrop-blur-3xl">
                  LogOut
                </span>
              </button>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}
