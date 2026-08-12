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
        <div className="hero-photo-in md:hidden relative w-full aspect-[615/900]">
          <Image
            src="/images/misc/hero-premium.jpg"
            alt="StreamAIR — фарба для аерографії"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-24 grid md:grid-cols-2 items-center gap-10 md:gap-6">
          <div className="hero-text-in flex flex-col items-start gap-6 text-left">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold max-w-xl text-white">
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
          <div className="hero-photo-in hidden md:flex justify-self-end">
            <div className="hero-photo-glow relative w-96 lg:w-[420px] aspect-[615/900] rounded-2xl overflow-hidden">
              <Image
                src="/images/misc/hero-premium.jpg"
                alt="StreamAIR — фарба для аерографії"
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <PopularCarousel products={popular} />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-heading text-2xl font-bold mb-5 text-white">Категорії</h2>
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
