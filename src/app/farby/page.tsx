import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PAINT_LINE_LABELS, PAINT_LINE_DESCRIPTIONS, PaintLine } from "@/data/types";
import { getPaintsByLine } from "@/data/products";

export const metadata: Metadata = {
  title: "Фарби для аерографії — StreamAIR",
  description:
    "Фарба для аерографії та нігтів StreamAIR: лінійки Basic, Neon, Nude, Pearl. Щільна пігментація, доставка по Україні.",
};

const LINES: PaintLine[] = ["basic", "neon", "nude", "pearl"];

export default function FarbyPage() {
  return (
    <div className="section-dark">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-heading text-3xl font-bold mb-2">Фарби</h1>
        <p className="text-white/60 mb-8">Оберіть лінійку кольорів</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {LINES.map((line) => {
            const items = getPaintsByLine(line);
            const cover = items[0];
            return (
              <Link
                key={line}
                href={`/farby/${line}`}
                className="tile-dark rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:-translate-y-1 transition-transform"
              >
                {cover && (
                  <div className="relative w-24 h-24 shrink-0 bg-white rounded-xl overflow-hidden">
                    <Image src={cover.image} alt={PAINT_LINE_LABELS[line]} fill className="object-contain p-2" />
                  </div>
                )}
                <div>
                  <h2 className="font-heading text-xl font-bold">{PAINT_LINE_LABELS[line]}</h2>
                  <p className="text-sm text-white/60 mt-1">{PAINT_LINE_DESCRIPTIONS[line]}</p>
                  <p className="text-xs text-white/40 mt-2">{items.length} кольорів</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
