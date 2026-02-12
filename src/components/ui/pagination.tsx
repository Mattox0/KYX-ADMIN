import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
}

const btnBase =
  "flex h-9 min-w-9 items-center justify-center rounded-md border text-sm font-medium transition-colors";
const btnIdle =
  "border-stroke text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2";
const btnActive =
  "border-primary bg-primary text-white";
const btnDisabled = "opacity-50 pointer-events-none";

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center gap-1">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(btnBase, btnIdle, "px-2", currentPage <= 1 && btnDisabled)}
      >
        &lsaquo;
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="flex h-9 min-w-9 items-center justify-center text-sm text-body-color dark:text-dark-6">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(btnBase, p === currentPage ? btnActive : btnIdle)}
          >
            {p}
          </button>
        ),
      )}

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(btnBase, btnIdle, "px-2", currentPage >= totalPages && btnDisabled)}
      >
        &rsaquo;
      </button>
    </nav>
  );
}
