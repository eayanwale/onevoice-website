import Image from "next/image";
import Link from "next/link";
import DuotonePhoto, { HERO_FILTER } from "@/components/DuotonePhoto";

// Small frames that drift over the hero like slow clouds. Each gets its own
// duration/delay/direction so the motion never falls into visible lockstep.
// Each is a different member so the group never reads as the same face
// twice. They sit in the open right-hand side of the frame — the curtain
// and cross — rather than over the singers or the headline.
// `parallax` is how far (px) the frame travels over the hero's scroll, read by
// ScrollReveals. Mixed values give the group depth — the nearer frames pull
// away faster than the far ones. `in` staggers the load-in.
const FLOATERS = [
  {
    src: "/images/float-planning.jpg",
    className: "right-[6%] top-[11%] w-[96px] sm:w-[132px] lg:w-[158px]",
    drift: "drift-a",
    duration: "19s",
    delay: "0s",
    parallax: -340,
    in: "0.15s",
  },
  {
    src: "/images/visual-world/candid-back-view.jpg",
    className: "right-[26%] top-[30%] hidden w-[120px] lg:block lg:w-[144px]",
    drift: "drift-c",
    duration: "27s",
    delay: "-13s",
    parallax: -155,
    in: "0.38s",
  },
  {
    src: "/images/float-worship-hands.jpg",
    className: "left-[23%] top-[31%] hidden w-[112px] lg:block lg:w-[138px]",
    drift: "drift-a",
    duration: "25s",
    delay: "-9s",
    parallax: -235,
    in: "0.3s",
  },
  {
    src: "/images/visual-world/drummer-motion.jpg",
    className: "right-[8%] top-[54%] hidden w-[110px] sm:block sm:w-[126px] lg:w-[150px]",
    drift: "drift-b",
    duration: "23s",
    delay: "-6s",
    parallax: -430,
    in: "0.53s",
  },
  {
    src: "/images/visual-world/hands-on-keys-detail.jpg",
    className: "left-[5%] top-[13%] w-[92px] sm:w-[118px] lg:w-[136px]",
    drift: "drift-b",
    duration: "31s",
    delay: "-3s",
    parallax: -185,
    in: "0.22s",
  },
];

// Fades the sharp copy out across the lower half of the frame, revealing the
// blurred copy stacked beneath it. Kept as a constant so the two mask
// properties can't drift apart.
const CROSSING_MASK =
  "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0) 82%)";


export default function Entrance() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
      {/* A 3:2 frame, so a landscape viewport shows very nearly the whole
          photo — the open curtain and cross on the right stay as real
          negative space instead of being cropped away. */}
      <div className="absolute inset-0 overflow-hidden">
        {/* No parallax here on purpose: the buffer it needs (h-[150%]) would
            crop ~1.4x into the frame and eat the open curtain and cross that
            make this shot work. The drifting frames carry the motion instead. */}
        <DuotonePhoto
          src="/images/home-hero.jpg"
          alt="OneVoice leading worship, singers at the mic with the band behind them"
          priority
          objectPosition="55% 45%"
          filter={HERO_FILTER}
          className="absolute inset-0 h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0.22) 28%, rgba(26,26,26,0.7) 66%, rgba(26,26,26,0.95) 100%)",
          }}
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Three nested elements per frame, because three separate animations
            each need their own `transform`: the outer one is the scroll
            parallax target, the middle plays the load-in, the inner drifts. */}
        {FLOATERS.map((f) => (
          <div
            key={f.src + f.className}
            data-float-parallax={f.parallax}
            className={`absolute ${f.className}`}
          >
            <div className="floater-in" style={{ animationDelay: f.in }}>
              <div
                className={`hero-floater ${f.drift}`}
                style={{ animationDuration: f.duration, animationDelay: f.delay }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)] ring-1 ring-off-white/15">
                  <Image
                    src={f.src}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* The one frame that deliberately crosses the headline. Two stacked
            copies of the same photo: a blurred one underneath, and a sharp
            one masked to fade out over the lower half — so the picture goes
            soft exactly where the type runs through it and stays crisp above.
            It sits below the z-10 content, so the headline itself stays sharp.
            lg+ only: at narrow widths the headline has no room to share. */}
        {/* Pinned from the bottom, not the top: the headline is bottom-anchored
            (the section is justify-end), so a top-% offset drifts away from it
            as viewport height changes and the crossing stops happening. The
            rem offset puts this frame's lower third across the first line. */}
        {/* lg+ only — this frame crosses the headline, and at phone widths
            there isn't room for it to do that without covering the type.
            Pinned from the bottom, not the top — the headline is
            bottom-anchored (the section is justify-end), so a top-% offset
            drifts away from it as viewport height changes and the crossing
            stops happening. Its lower third lands across the first line,
            sharp above and soft where the type runs through it. */}
        <div
          data-float-parallax="-280"
          className="absolute bottom-[17rem] left-[32%] hidden w-[152px] lg:block"
        >
          <div className="floater-in" style={{ animationDelay: "0.45s" }}>
            <div
              className="hero-floater drift-c"
              style={{ animationDuration: "29s", animationDelay: "-17s" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)] ring-1 ring-off-white/15">
                {/* scale-110 so the blur doesn't pull transparency in at the edges */}
                <Image
                  src="/images/float-rehearsal-talk.jpg"
                  alt=""
                  fill
                  sizes="200px"
                  className="scale-110 object-cover opacity-80 blur-[7px]"
                />
                <Image
                  src="/images/float-rehearsal-talk.jpg"
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover opacity-80"
                  style={{ maskImage: CROSSING_MASK, WebkitMaskImage: CROSSING_MASK }}
                />
              </div>
            </div>
          </div>
        </div>
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
            Ten friends carrying one conviction; that when ordinary
            voices are lifted honestly, God shows up.
          </p>
          <div className="flex flex-wrap gap-3 sm:ml-auto">
            <Link href="/invite" className="btn-solid">
              invite us ↗
            </Link>
            <Link href="/about" className="btn-outline text-off-white">
              our story
            </Link>
          </div>
        </div>
      </div>

      {/* sm+ only: at phone heights this lands on top of the CTA row rather
          than below it, and a phone doesn't need a hint to scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center pb-[env(safe-area-inset-bottom)] sm:flex"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-off-white/20">
          <span className="scroll-cue-dot absolute inset-x-0 top-0 h-3.5 w-px bg-warm-sage" />
        </span>
      </div>
    </section>
  );
}
