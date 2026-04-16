import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Build className strings and resolve Tailwind utility conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
