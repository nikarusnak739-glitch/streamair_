import type { Metadata } from "next";
import { getAdditionalMaterials } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Додаткові матеріали — StreamAIR",
};

export default function MaterialyPage() {
  const items = getAdditionalMaterials();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">Додаткові матеріали</h1>
      <p className="opacity-70 mb-8">
        Сітка для дизайну, блокнот для трафаретів, засіб для очищення аерографа та топове покриття
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
