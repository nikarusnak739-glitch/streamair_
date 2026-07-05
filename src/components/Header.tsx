"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/farby", label: "Фарби" },
  { href: "/trafarety", label: "Трафарети" },
  { href: "/materialy", label: "Додаткові матеріали" },
];

export default function Header() {
  const { totalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 card-surface shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/misc/logo.png"
            alt="StreamAIR Aerography"
            width={160}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent-pink transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-sm font-medium hover:text-accent-pink transition-colors"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center rounded-full bg-[var(--foreground)] text-white w-10 h-10 hover:opacity-90 transition-opacity"
            aria-label="Кошик"
          >
            🛒
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-black/5 px-4 py-3 flex flex-col gap-3 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            {INSTAGRAM_HANDLE} в Instagram
          </a>
        </nav>
      )}
    </header>
  );
}
