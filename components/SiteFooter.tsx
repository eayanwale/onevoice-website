import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="flex justify-center bg-charcoal px-6 pb-10 pt-8 sm:px-10">
      <div className="flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-warm-sage/20 pt-7">
        <Image
          src="/logo/one-voice-lockup-light-trimmed.png"
          alt="One Voice — est. 2023, USA"
          width={981}
          height={405}
          className="h-6 w-auto object-contain"
        />
        <span className="text-xs tracking-wide text-off-white/40">
          &copy; 2026 one voice. all rights reserved.
        </span>
        <span className="text-xs tracking-wide text-off-white/40">
          one mind. one voice.
        </span>
      </div>
    </footer>
  );
}
