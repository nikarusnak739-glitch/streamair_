"use client";

import { useState } from "react";
import { Product } from "@/data/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center card-surface rounded-full overflow-hidden">
          <button
            className="w-10 h-10 font-bold"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Зменшити кількість"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <button
            className="w-10 h-10 font-bold"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Збільшити кількість"
          >
            +
          </button>
        </div>
        <span className="text-2xl font-extrabold">{formatPrice(product.price * qty)}</span>
      </div>
      <button
        onClick={() => {
          addItem(product, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
        className="rounded-full bg-[var(--foreground)] text-white px-6 py-3 font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
      >
        {added ? "Додано ✓" : "Додати в кошик"}
      </button>
    </div>
  );
}
