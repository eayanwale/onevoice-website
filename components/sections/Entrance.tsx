import Image from "next/image";
import Link from "next/link";
import DuotonePhoto from "@/components/DuotonePhoto";

// Small frames that drift over the hero like slow clouds. Each gets its own
// duration/delay/direction so the motion never falls into visible lockstep.
// Each is a different member, so the group never reads as the same face
// twice, and they sit in the open charcoal rather than over the singers.
const FLOATERS = [
  {
    src: "/images/visual-world/solo-smoke-backdrop.jpg",
    className: "left-[5%] top-[14%] w-[100px] sm:w-[138px] lg:w-[166px]",
    drift: "drift-a",
    duration: "19s",
    delay: "0s",
  },
  {
    src: "/images/visual-world/candid-back-view.jpg",
    className: "left-[30%] top-[26%] hidden w-[126px] sm:block lg:w-[150px]",
    drift: "drift-c",
    duration: "27s",
    delay: "-13s",
  },
  {
    src: "/images/visual-world/drummer-motion.jpg",
    className: "right-[7%] top-[9%] w-[88px] sm:w-[120px] lg:w-[142px]",
    drift: "drift-b",
    duration: "23s",
    delay: "-6s",
  },
  {
    src: "/images/visual-world/hands-on-keys-detail.jpg",
    className: "left-[18%] top-[34%] hidden w-[118px] lg:block lg:w-[140px]",
    drift: "drift-b",
    duration: "31s",
    delay: "-3s",
  },
];

export default function Entrance() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal">
      {/* The frame is a portrait shot, so filling a landscape viewport with
          object-cover would just magnify the singers. Instead it keeps its
          own panel on the right and flat charcoal carries the left — the
          negative space is the ground, not a crop of the photo. */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
          <DuotonePhoto
            src="/images/visual-world/stage-full-group-lights.jpg"
            alt="Three of the One Voice singers leading worship under stage light"
            priority
            parallax
            objectPosition="50% 32%"
            className="absolute inset-x-0 -top-[25%] h-[150%] w-full"
          />
          <div className="absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-charcoal via-charcoal/75 to-transparent lg:block" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0.2) 30%, rgba(26,26,26,0.66) 68%, rgba(26,26,26,0.94) 100%)",
          }}
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {FLOATERS.map((f) => (
          <div
            key={f.src + f.className}
            className={`hero-floater absolute ${f.drift} ${f.className}`}
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
        ))}
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
              invite us ↗
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
