const FACTS = [
  { n: "2023", label: "established" },
  { n: "10", label: "friends" },
  { n: "1", label: "voice" },
];

export default function TheFacts() {
  return (
    <section className="relative bg-off-white px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 sm:items-center sm:gap-8">
        <div data-reveal>
          <div className="label-text mb-5 text-deep-brown">the facts</div>
          <p className="max-w-md text-[22px] font-semibold leading-[1.35] text-charcoal sm:text-[28px]">
            here&rsquo;s who we are, in numbers.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:justify-items-end sm:gap-10">
          {FACTS.map((fact) => (
            <div key={fact.label} data-reveal className="sm:text-right">
              <div className="font-display text-[40px] font-semibold leading-none text-deep-brown sm:text-[56px]">
                {fact.n}
              </div>
              <div className="label-text mt-3 text-deep-brown/60">
                {fact.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
