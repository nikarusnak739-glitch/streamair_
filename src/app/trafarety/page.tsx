import type { Metadata } from "next";
import { getStencils } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Трафарети для аерографії — StreamAIR",
  description:
    "Трафарети StreamAIR для аерографії нігтів: квіти, геометрія, написи та інші дизайни. Багаторазові, чіткий контур, доставка по Україні.",
};

export default function TrafaretyPage() {
  const items = getStencils();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-3xl font-bold mb-2">Трафарети</h1>
      <p className="opacity-70 mb-8">
        {items.length} багаторазових трафаретів для аерографії, пронумеровані за каталогом
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
