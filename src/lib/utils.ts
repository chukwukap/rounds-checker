import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { UserRoundsData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(value);
  } else if (value >= 1_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 2,
    }).format(value);
  } else {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value);
  }
}
