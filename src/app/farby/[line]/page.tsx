import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAINT_LINE_LABELS, PaintLine } from "@/data/types";
import { getPaintsByLine } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const VALID_LINES: PaintLine[] = ["basic", "neon", "nude", "pearl"];

export function generateStaticParams() {
  return VALID_LINES.map((line) => ({ line }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ line: string }>;
}): Promise<Metadata> {
  const { line } = await params;
  const label = VALID_LINES.includes(line as PaintLine) ? PAINT_LINE_LABELS[line as PaintLine] : "Фарби";
  return { title: `${label} — StreamAIR` };
}

export default async function FarbyLinePage({ params }: { params: Promise<{ line: string }> }) {
  const { line } = await params;
  if (!VALID_LINES.includes(line as PaintLine)) {
    notFound();
  }

  const paintLine = line as PaintLine;
  const items = getPaintsByLine(paintLine);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/farby" className="text-sm opacity-60 hover:opacity-100">
        ← Всі фарби
      </Link>
      <h1 className="text-3xl font-extrabold mt-2 mb-8">{PAINT_LINE_LABELS[paintLine]}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
