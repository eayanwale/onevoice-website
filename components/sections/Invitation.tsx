import Link from "next/link";

export default function Invitation() {
  return (
    <section
      id="connect"
      className="on-bone relative overflow-hidden py-24 sm:py-32 scroll-mt-16 sm:scroll-mt-[76px]"
    >
      <div className="grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p data-reveal className="label-text text-muted">
          bring us to your room
        </p>
        <h2 data-reveal className="display-lg mt-6">
          worship nights, services, weddings, camps, living rooms.
        </h2>
        <p data-reveal className="mt-6 leading-relaxed text-muted">
          Tell us about the gathering and we&rsquo;ll come back to you personally.
        </p>
        <Link href="/invite" data-reveal className="btn-solid mt-10">
          invite one voice ↗
        </Link>
      </div>
    </section>
  );
}
