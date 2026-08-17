const VALUES = [
  {
    label: "friends",
    body: "before anything else, we know each other. the music comes second.",
  },
  {
    label: "united in harmony",
    body: "different voices, same song — that’s the whole idea.",
  },
  {
    label: "declaring the love of the Lord",
    body: "everything we make is pointed at one thing.",
  },
];

export default function CoreValues() {
  return (
    <section className="relative bg-off-white px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="label-text mb-14 text-deep-brown">
          what we stand on
        </div>
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {VALUES.map((value) => (
            <div key={value.label} data-reveal>
              <div className="mb-6 h-[3px] w-10 bg-deep-brown" />
              <h3 className="mb-3 text-[22px] font-semibold leading-[1.15] text-charcoal sm:text-[26px]">
                {value.label}
              </h3>
              <p className="text-[15px] leading-[1.65] text-deep-brown/80">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
