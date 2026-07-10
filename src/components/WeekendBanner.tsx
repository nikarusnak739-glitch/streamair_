"use client";

import { useEffect, useState } from "react";

// Банер діє до понеділка 00:00 (Київ), далі зникає автоматично.
// Ціни на трафарети в каталозі не змінюються — це суто рекламний банер.
const PROMO_END = new Date("2026-07-13T00:00:00+03:00").getTime();

export default function WeekendBanner() {
  const [visible, setVisible] = useState(() => Date.now() < PROMO_END);

  useEffect(() => {
    if (!visible) return;
    const check = () => {
      if (Date.now() >= PROMO_END) setVisible(false);
    };
    const id = setInterval(check, 30_000);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="weekend-banner mx-auto max-w-6xl mt-6 px-4"
      suppressHydrationWarning
    >
      <div className="weekend-banner-surface">
        <div className="weekend-banner-blobs" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-2 py-9 px-6 text-center">
          <span className="weekend-banner-title">Шалені вихідні</span>
          <span className="weekend-banner-subtitle">-20% на трафарети</span>
        </div>
      </div>
    </div>
  );
}
