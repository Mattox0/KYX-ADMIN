"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Dropdown, DropdownContent, DropdownTrigger } from "./ui/dropdown";
import { Mode } from "@/types/api/Mode";

type PropsType = {
  modes: Mode[];
  value: string | null;
  onChange: (modeId: string | null) => void;
};

export function ModePicker({ modes, value, onChange }: PropsType) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedMode = modes.find((m) => m.id === value);

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        className={cn(
          "flex h-8 w-full items-center justify-between gap-x-1 rounded-md border border-[#E8E8E8] bg-white px-3 py-2 text-sm font-medium text-dark-5 outline-none ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:ring-offset-neutral-950 [&>span]:line-clamp-1 [&[data-state='open']>svg]:rotate-0",
        )}
      >
        <span>{selectedMode?.name ?? "Tous les modes"}</span>

        <ChevronUpIcon className="size-4 rotate-180 transition-transform" />
      </DropdownTrigger>

      <DropdownContent
        align="end"
        className="min-w-[10rem] rounded-lg border border-[#E8E8E8] bg-white p-1 font-medium text-dark-5 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 dark:border-dark-3 dark:bg-dark-2 dark:text-current"
      >
        <ul>
          <li>
            <button
              className={cn(
                "flex w-full select-none items-center truncate rounded-md px-3 py-2 text-sm outline-none hover:bg-[#F9FAFB] hover:text-dark-3 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white",
                value === null && "bg-[#F9FAFB] text-dark-3 dark:bg-[#FFFFFF1A] dark:text-white",
              )}
              onClick={() => {
                onChange(null);
                setIsOpen(false);
              }}
            >
              Tous les modes
            </button>
          </li>
          {modes.map((mode) => (
            <li key={mode.id}>
              <button
                className={cn(
                  "flex w-full select-none items-center truncate rounded-md px-3 py-2 text-sm outline-none hover:bg-[#F9FAFB] hover:text-dark-3 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white",
                  value === mode.id && "bg-[#F9FAFB] text-dark-3 dark:bg-[#FFFFFF1A] dark:text-white",
                )}
                onClick={() => {
                  onChange(mode.id);
                  setIsOpen(false);
                }}
              >
                {mode.name}
              </button>
            </li>
          ))}
        </ul>
      </DropdownContent>
    </Dropdown>
  );
}
