
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhoneNumber = (value: string): string => {
  if (!value) return '';
  const cleaned = value.replace(/\D/g, '').slice(0, 11); // Max 11 digits

  if (cleaned.length === 0) return '';
  if (cleaned.length <= 2) { // (XX
    return `(${cleaned}`;
  }
  if (cleaned.length <= 7) { // (XX) XXXXX or (XX) XXXX (depending on total length)
                            // If total is 10 digits, first part is 4: (XX) XXXX
                            // If total is 11 digits, first part is 5: (XX) XXXXX
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  // cleaned.length > 7 (up to 11)
  // (XX) XXXXX-XXXX (11 digits total -> 5 then 4)
  // (XX) XXXX-XXXX  (10 digits total -> 4 then 4)
  const firstPartLength = cleaned.length === 11 ? 5 : 4;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 2 + firstPartLength)}-${cleaned.slice(2 + firstPartLength)}`;
};
