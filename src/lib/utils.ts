import { clsx, type ClassValue } from "clsx";
import { debounce } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareArrays = (a: any[], b: any[]) => {
  return a.toString() === b.toString();
};

// Utility to generate visible page numbers based on current page & total pages
export const getVisiblePages = (current: number, total: number, windowSize: number) => {
  const pages: number[] = [];

  if (total <= windowSize) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + windowSize - 1);

  if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return pages;
};

export const debouncedSyncCart = debounce(
  (syncFn: () => Promise<void>) => {
    syncFn();
  },
  1500 // wait 1.5 seconds
);
