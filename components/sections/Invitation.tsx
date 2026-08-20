import Link from "next/link";

export default function Invitation() {
  return (
    <section
      id="connect"
      className="on-bone relative overflow-hidden py-24 sm:py-32 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="grain" aria-hidden="true" />
      {/* max-w-5xl, not 3xl: the heading is 31 characters and display-lg caps
          at 3.5rem, so it needs ~920px to stay on one line at desktop. The
          paragraph gets its own narrower max-w so it doesn't stretch with it. */}
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p data-reveal className="label-text text-muted">
          an open invitation
        </p>
        <h2 data-reveal className="display-lg mt-6">
          we&rsquo;d love to minister with you.
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
          Tell us what you&rsquo;re planning, and one of us will write back.
        </p>
        <Link href="/invite" data-reveal className="btn-solid mt-10">
          invite us ↗
        </Link>
      </div>
    </section>
  );
}
