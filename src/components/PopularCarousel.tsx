import { Product } from "@/data/types";
import ProductCard from "./ProductCard";

export default function PopularCarousel({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  // Дублюємо картки для безшовної стрічки
  const loopItems = [...products, ...products];

  return (
    <section className="bg-[var(--graphite)] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-2xl font-bold mb-5 text-white">Популярне</h2>
        <div className="marquee-viewport">
          <div className="marquee-track">
            {loopItems.map((product, i) => (
              <ProductCard key={`${product.id}-${i}`} product={product} className="w-44 sm:w-52 shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
