import Link from "next/link";

export default function CategoryTile({
  href,
  title,
  subtitle,
  emoji,
}: {
  href: string;
  title: string;
  subtitle: string;
  emoji: string;
}) {
  return (
    <Link
      href={href}
      className="tile-dark rounded-2xl p-6 flex flex-col items-start gap-2 shadow-sm hover:-translate-y-1 transition-transform"
    >
      <span className="text-3xl">{emoji}</span>
      <span className="font-heading font-bold text-lg">{title}</span>
      <span className="text-sm text-white/60">{subtitle}</span>
    </Link>
  );
}
