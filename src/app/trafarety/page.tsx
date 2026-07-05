import type { Metadata } from "next";
import { getStencils } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Трафарети для аерографії — StreamAIR",
};

export default function TrafaretyPage() {
  const items = getStencils();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">Трафарети</h1>
      <p className="opacity-70 mb-8">{items.length} багаторазових трафаретів для аерографії, пронумеровані за каталогом</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
