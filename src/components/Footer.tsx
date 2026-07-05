import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-16 card-surface border-t border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <p className="opacity-70">© {new Date().getFullYear()} StreamAIR Aerography</p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-full bg-white/70 hover:bg-white px-4 py-2 transition-colors shadow-sm max-w-sm text-center sm:text-left"
        >
          <span className="text-2xl shrink-0">📸</span>
          <span>
            <span className="font-semibold block">Instagram: {INSTAGRAM_HANDLE}</span>
            <span className="opacity-60 text-xs">
              Зворотний зв&apos;язок, огляди фарб і трафаретів та корисні лайфхаки з аерографії
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
}
