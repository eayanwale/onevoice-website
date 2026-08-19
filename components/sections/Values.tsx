const VALUES = [
  {
    title: "friends first",
    body: "Before a set list or a stage, One Voice is a group of friends. What happens in the room comes out of what happens between us.",
  },
  {
    title: "united in harmony",
    body: "About ten voices, one sound. We arrange around each other rather than over each other, so the song stays bigger than any one part.",
  },
  {
    title: "welcoming every generation",
    body: "Reverent, honest worship that welcomes every generation into His presence, from a Sunday morning to a late-night gathering.",
  },
];

export default function Values() {
  return (
    <section className="relative bg-off-white px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="label-text mb-10 text-deep-brown">
          what holds us together
        </div>
        <div className="grid gap-px overflow-hidden bg-deep-brown/15 sm:grid-cols-3">
          {VALUES.map((value, i) => (
            <div key={value.title} data-reveal className="bg-off-white p-8 sm:p-10">
              <p className="label-text text-deep-brown/50">0{i + 1}</p>
              <h3 className="mt-6 text-[22px] font-semibold leading-[1.15] text-charcoal">
                {value.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-deep-brown/70">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
