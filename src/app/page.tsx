import Image from "next/image";
import Link from "next/link";
import PopularCarousel from "@/components/PopularCarousel";
import CategoryTile from "@/components/CategoryTile";
import WeekendBanner from "@/components/WeekendBanner";
import { getPopularProducts } from "@/data/products";

export default function Home() {
  const popular = getPopularProducts();

  return (
    <div>
      <WeekendBanner />
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 flex flex-col items-center text-center gap-6">
        <Image
          src="/images/misc/logo.png"
          alt="StreamAIR Aerography"
          width={360}
          height={98}
          className="w-64 sm:w-80 h-auto"
          priority
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold max-w-2xl">
          Фарби та трафарети для аерографії
        </h1>
        <p className="max-w-xl opacity-70">
          Фірмова продукція streamair_: фарби, трафарети, рідина для промивки аерографа, сітки для дизайну,
          топ для перекриття аерографії.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/farby"
            className="rounded-full bg-[var(--foreground)] text-white px-6 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Обрати фарби
          </Link>
          <Link
            href="/trafarety"
            className="rounded-full card-surface px-6 py-3 font-medium hover:-translate-y-0.5 transition-transform"
          >
            Каталог трафаретів
          </Link>
        </div>
      </section>

      <PopularCarousel products={popular} />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold mb-5">Категорії</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CategoryTile href="/farby" emoji="🎨" title="Фарби" subtitle="Basic, Neon, Nude, Pearl" />
          <CategoryTile href="/trafarety" emoji="🦋" title="Трафарети" subtitle="Понад 45 дизайнів" />
          <CategoryTile
            href="/materialy"
            emoji="🧰"
            title="Додаткові матеріали"
            subtitle="Сітка, блокнот, клінер, топ"
          />
        </div>
      </section>
    </div>
  );
}
