import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareArrays = (a: any[], b: any[]) => {
  return a.toString() === b.toString();
};

// Utility to generate visible page numbers based on current page & total pages
export const getVisiblePages = (
  current: number,
  total: number,
  windowSize: number
) => {
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

export const splitName = (fullName: string) => {
  const names = fullName.split(" ");
  return {
    firstName: names[0] || "",
    lastName: names.slice(1).join(" ") || "",
  };
};

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
) {
  let timer: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
