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
          objectPosition="50% 12%"
          className="absolute inset-x-0 -top-[25%] h-[150%] w-full"
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

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div data-reveal className="label-text mb-6 text-warm-sage">
          why we&rsquo;re called one voice
        </div>
        <p
          data-reveal
          className="max-w-xl text-balance text-[24px] leading-[1.4] text-off-white sm:text-[34px]"
        >
          &ldquo;&hellip;that together you may with{" "}
          <span className="accent-word text-warm-sage">one voice</span>{" "}
          glorify the God and Father of our Lord Jesus Christ.&rdquo;
        </p>
        <p data-reveal className="mt-5 text-sm tracking-wide text-off-white/60">
          &mdash; romans 15:6
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-9 z-10 flex justify-center pb-[env(safe-area-inset-bottom)] sm:bottom-12"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-off-white/20">
          <span className="scroll-cue-dot absolute inset-x-0 top-0 h-3.5 w-px bg-warm-sage" />
        </span>
      </div>
    </section>
  );
}
