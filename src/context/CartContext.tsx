"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/data/types";

export interface CartItem {
  id: string;
  title: string;
  line?: string;
  number?: string;
  volume?: string;
  price: number;
  image: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "streamair-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Одноразова гідратація кошика з localStorage після монтування на клієнті —
    // навмисно читаємо зовнішнє сховище в ефекті, щоб уникнути розбіжності SSR/клієнт.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          line: product.line,
          number: product.number,
          volume: product.volume,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });

    fetch("/api/notify-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        number: product.number,
        volume: product.volume,
        price: product.price,
        qty,
      }),
    }).catch(() => {
      // сповіщення не критичне для роботи кошика
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clear, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
