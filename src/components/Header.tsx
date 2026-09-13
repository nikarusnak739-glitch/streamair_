"use client";

import Link from "next/link";
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
    <header className="hero-dark sticky top-0 z-40 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex flex-col shrink-0 leading-none">
          <span className="font-heading text-2xl sm:text-3xl tracking-wide text-white">
            Stream<span className="font-normal text-white/80">AIR</span>
          </span>
          <span className="text-[10px] sm:text-xs tracking-[0.35em] text-white/50 mt-0.5">
            AEROGRAPHY
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/80">
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
            aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/80 hover:text-accent-pink transition-colors group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
            {INSTAGRAM_HANDLE}
          </a>
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white w-10 h-10 hover:bg-white/20 transition-colors"
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
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-white/80">
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
