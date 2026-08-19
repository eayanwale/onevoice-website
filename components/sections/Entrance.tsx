import Image from "next/image";
import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";

export default function Entrance() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0 overflow-hidden">
        <DuotonePhoto
          src="/images/hero-collective.jpg"
          alt="The One Voice collective"
          priority
          parallax
          objectPosition="50% 12%"
          className="absolute inset-x-0 -top-[25%] h-[150%] w-full"
        />
        {/* The hero photo is a bright, high-key studio frame, so the scrim
            has to work harder under the headline than a moody image would. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.62) 0%, rgba(26,26,26,0.38) 30%, rgba(26,26,26,0.72) 62%, rgba(26,26,26,0.94) 100%)",
          }}
        />
      </div>
      <div className="grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
        <Image
          data-reveal
          src="/logo/one-voice-mark-light-trimmed.png"
          alt=""
          width={200}
          height={200}
          className="h-16 w-auto opacity-90 sm:h-20"
        />
        <h1 data-reveal className="display-xl mt-8 max-w-4xl text-off-white">
          that with one mind
          <br />
          and one voice.
        </h1>
        <div data-reveal className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end">
          <p className="max-w-md text-base leading-relaxed text-off-white/75">
            about ten friends, one mission. a worship group singing so a
            room can meet the Lord together.
          </p>
          <div className="flex flex-wrap gap-3 sm:ml-auto">
            <Link href="/invite" className="btn-solid">
              invite us &rarr;
            </Link>
            <Link href="/about" className="btn-outline text-off-white">
              our story
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center pb-[env(safe-area-inset-bottom)]"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-off-white/20">
          <span className="scroll-cue-dot absolute inset-x-0 top-0 h-3.5 w-px bg-warm-sage" />
        </span>
      </div>
    </section>
  );
}
