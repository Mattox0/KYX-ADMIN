import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PropsType = {
  title: string;
  children: ReactNode;
  className?: string;
  headerChildren?: ReactNode;
};

export function ShowcaseSection({ title, children, headerChildren, className }: PropsType) {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between border-b border-stroke dark:border-dark-3">
        <h2 className="px-4 py-4 font-medium text-dark dark:text-white sm:px-6 xl:px-7.5">
          {title}
        </h2>

        {headerChildren}
      </div>

      <div className={cn("p-4 sm:p-6 xl:p-10", className)}>{children}</div>
    </div>
  );
}
