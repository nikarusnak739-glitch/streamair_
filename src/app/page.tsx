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
      <section className="hero-dark relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 items-center gap-10 md:gap-6">
          <div className="hero-text-in flex flex-col items-start gap-6 text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-xl text-white">
              Фарби та трафарети для аерографії
            </h1>
            <p className="max-w-xl text-white/70">
              Фірмова продукція streamair_: фарби, трафарети, рідина для промивки аерографа, сітки для
              дизайну, топ для перекриття аерографії.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/farby"
                className="rounded-full bg-white text-[var(--foreground)] px-6 py-3 font-medium hover:opacity-90 hover:-translate-y-0.5 transition"
              >
                Обрати фарби
              </Link>
              <Link
                href="/trafarety"
                className="rounded-full border border-white/30 text-white px-6 py-3 font-medium hover:bg-white/10 hover:-translate-y-0.5 transition"
              >
                Каталог трафаретів
              </Link>
            </div>
          </div>
          <div className="hero-photo-in order-1 md:order-2 justify-self-center md:justify-self-end">
            <div className="hero-photo-glow relative w-56 sm:w-72 md:w-80 aspect-[615/900] rounded-2xl overflow-hidden">
              <Image
                src="/images/misc/hero-premium.jpg"
                alt="StreamAIR — фарба для аерографії"
                fill
                sizes="(max-width: 768px) 60vw, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
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
