import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Bulk pricing tiers
// 1-2 items: Base price
// 3-4 items: 10% discount
// 5-9 items: 20% discount
// 10-19 items: 30% discount
// 20-49 items: 40% discount
// 50+ items: 50% discount
export function getDiscountPercentage(quantity: number): number {
  if (quantity >= 50) return 50;
  if (quantity >= 20) return 40;
  if (quantity >= 10) return 30;
  if (quantity >= 5) return 20;
  if (quantity >= 3) return 10;
  return 0;
}

export function getDiscountedUnitPrice(basePrice: number | string, quantity: number): number {
  const price = Number(basePrice);
  const discount = getDiscountPercentage(quantity);
  return price * (1 - discount / 100);
}
