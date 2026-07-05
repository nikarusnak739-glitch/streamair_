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
      className="card-surface rounded-2xl p-6 flex flex-col items-start gap-2 shadow-sm hover:-translate-y-1 transition-transform"
    >
      <span className="text-3xl">{emoji}</span>
      <span className="font-bold text-lg">{title}</span>
      <span className="text-sm opacity-60">{subtitle}</span>
    </Link>
  );
}
