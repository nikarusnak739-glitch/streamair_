"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, setQty, totalPrice, clear } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    branch: "",
    comment: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total: totalPrice, customer: form }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      clear();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Дякуємо за замовлення! 🎉</h1>
        <p className="opacity-70 mb-6">
          Ми отримали ваше замовлення і зв&apos;яжемось з вами найближчим часом для підтвердження.
        </p>
        <p className="opacity-70 mb-8">
          Є питання просто зараз? Пишіть в Instagram{" "}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-pink">
            {INSTAGRAM_HANDLE}
          </a>
        </p>
        <Link href="/" className="rounded-full bg-[var(--foreground)] text-white px-6 py-3 font-medium inline-block">
          На головну
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8">Кошик</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="opacity-70 mb-6">Кошик порожній</p>
          <Link href="/farby" className="rounded-full bg-[var(--foreground)] text-white px-6 py-3 font-medium inline-block">
            До каталогу
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="card-surface rounded-xl p-3 flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0 bg-white rounded-lg overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{item.title}</p>
                  {item.volume && <p className="text-xs opacity-60">{item.volume}</p>}
                </div>
                <div className="flex items-center card-surface rounded-full overflow-hidden">
                  <button className="w-8 h-8" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Зменшити">
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{item.qty}</span>
                  <button className="w-8 h-8" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Збільшити">
                    +
                  </button>
                </div>
                <span className="font-bold w-20 text-right">{formatPrice(item.price * item.qty)}</span>
                <button onClick={() => removeItem(item.id)} className="opacity-50 hover:opacity-100" aria-label="Видалити">
                  ✕
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 px-1">
              <span className="opacity-70">Разом</span>
              <span className="text-xl font-extrabold">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-surface rounded-2xl p-5 flex flex-col gap-3 h-fit">
            <h2 className="font-bold text-lg mb-1">Оформлення замовлення</h2>
            <input
              required
              placeholder="Ім'я та прізвище"
              className="rounded-lg border border-black/10 px-3 py-2 bg-white"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="tel"
              placeholder="Телефон"
              className="rounded-lg border border-black/10 px-3 py-2 bg-white"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              required
              placeholder="Місто (Нова Пошта)"
              className="rounded-lg border border-black/10 px-3 py-2 bg-white"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              required
              placeholder="Відділення / поштомат"
              className="rounded-lg border border-black/10 px-3 py-2 bg-white"
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
            />
            <textarea
              placeholder="Коментар до замовлення (необов'язково)"
              className="rounded-lg border border-black/10 px-3 py-2 bg-white resize-none"
              rows={3}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-[var(--foreground)] text-white px-6 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "sending" ? "Надсилаємо..." : "Оформити замовлення"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600">
                Не вдалося надіслати замовлення. Спробуйте ще раз або напишіть в Instagram {INSTAGRAM_HANDLE}.
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
