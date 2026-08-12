import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="hero-dark mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-white">
        <p className="text-white/60">© {new Date().getFullYear()} StreamAIR Aerography</p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 transition-colors max-w-sm text-center sm:text-left"
        >
          <span className="text-2xl shrink-0">📸</span>
          <span>
            <span className="font-semibold block">Instagram: {INSTAGRAM_HANDLE}</span>
            <span className="text-white/60 text-xs">
              Зворотний зв&apos;язок, огляди фарб і трафаретів та корисні лайфхаки з аерографії
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
}
