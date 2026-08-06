import Image from "next/image";
import DuotonePhoto from "@/components/DuotonePhoto";

export default function Entrance() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-charcoal px-6 py-12 sm:px-10">
      <div className="absolute inset-0 overflow-hidden">
        <DuotonePhoto
          src="/images/hero-collective.jpg"
          alt="The One Voice collective"
          priority
          parallax
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 48% at 50% 44%, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0) 22%, rgba(26,26,26,0) 70%, rgba(26,26,26,0.65) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-x-6 top-6 z-10 flex flex-col gap-1 sm:inset-x-10 sm:top-8 sm:flex-row sm:items-start sm:justify-between">
        <span className="label-text text-off-white/60">
          three voices. one mission.
        </span>
        <span className="label-text text-off-white/60 sm:text-right">
          gospel music collective
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div data-reveal className="mb-7">
          <Image
            src="/logo/one-voice-mark-light.png"
            alt="One Voice"
            width={1563}
            height={1563}
            priority
            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
          />
        </div>
        <p
          data-reveal
          className="max-w-xl text-balance text-[22px] leading-[1.35] text-off-white sm:text-[32px]"
        >
          when the noise stops,
          <br />
          we&rsquo;re still here — singing.
        </p>

        <div
          data-reveal
          className="mt-24 flex flex-col items-center gap-2.5 sm:mt-32"
        >
          <span className="label-text text-off-white/45">scroll</span>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            className="animate-pulse"
            aria-hidden="true"
          >
            <path
              d="M1 1L7 8L13 1"
              stroke="#BEB7A7"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 11L7 18L13 11"
              stroke="#BEB7A7"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
