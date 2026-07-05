import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PAINT_LINE_LABELS, PAINT_LINE_DESCRIPTIONS, PaintLine } from "@/data/types";
import { getPaintsByLine } from "@/data/products";

export const metadata: Metadata = {
  title: "Фарби для аерографії — StreamAIR",
};

const LINES: PaintLine[] = ["basic", "neon", "nude", "pearl"];

export default function FarbyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">Фарби</h1>
      <p className="opacity-70 mb-8">Оберіть лінійку кольорів</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {LINES.map((line) => {
          const items = getPaintsByLine(line);
          const cover = items[0];
          return (
            <Link
              key={line}
              href={`/farby/${line}`}
              className="card-surface rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:-translate-y-1 transition-transform"
            >
              {cover && (
                <div className="relative w-24 h-24 shrink-0 bg-white rounded-xl overflow-hidden">
                  <Image src={cover.image} alt={PAINT_LINE_LABELS[line]} fill className="object-contain p-2" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">{PAINT_LINE_LABELS[line]}</h2>
                <p className="text-sm opacity-60 mt-1">{PAINT_LINE_DESCRIPTIONS[line]}</p>
                <p className="text-xs opacity-50 mt-2">{items.length} кольорів</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
