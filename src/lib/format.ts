import { PAINT_LINE_LABELS } from "@/data/types";
import type { Product } from "@/data/types";

export function formatPrice(price: number): string {
  return `${price} ₴`;
}

export function getProductName(product: Product): string {
  if (product.category === "paint" && product.line && product.number && /^\d+$/.test(product.number)) {
    return `${PAINT_LINE_LABELS[product.line]} ${product.number}`;
  }
  return product.title;
}

export function getProductSubtitle(product: Product): string {
  const parts: string[] = [];
  if (product.volume) parts.push(product.volume);
  if (product.category === "paint" && product.colorName) parts.push(product.colorName);
  return parts.join(" · ");
}
