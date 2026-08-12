"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/types";
import { useCart } from "@/context/CartContext";
import { formatPrice, getProductName, getProductSubtitle } from "@/lib/format";

export default function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const subtitle = getProductSubtitle(product);

  return (
    <div
      className={`card-surface rounded-2xl overflow-hidden shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md transition-[transform,box-shadow] duration-200 ${className}`}
    >
      <Link href={`/product/${product.id}`} className="block aspect-square relative bg-white">
        <Image
          src={product.image}
          alt={getProductName(product)}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-contain p-3"
        />
      </Link>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <Link
          href={`/product/${product.id}`}
          className="font-semibold leading-tight text-[var(--graphite)] hover:text-accent-pink transition-colors"
        >
          {getProductName(product)}
        </Link>
        {subtitle && <p className="text-xs text-[var(--graphite)] opacity-60">{subtitle}</p>}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold text-[var(--graphite)]">{formatPrice(product.price)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="text-xs font-medium rounded-full bg-[var(--graphite)] text-white px-3 py-2 hover:opacity-90 transition-opacity"
          >
            В кошик
          </button>
        </div>
      </div>
    </div>
  );
}
