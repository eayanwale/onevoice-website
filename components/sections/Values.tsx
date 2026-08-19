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

export default function Values({
  overline = "what holds us together",
  layout = "grid",
}: {
  overline?: string;
  layout?: "grid" | "rows";
}) {
  const isRows = layout === "rows";

  return (
    <section className="on-bone relative overflow-hidden py-24 sm:py-32">
      <div className="grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-shell px-5 sm:px-8">
        <p data-reveal className="label-text text-muted">
          {overline}
        </p>
        <div
          className={`mt-14 bg-ink/15 ${isRows ? "space-y-px" : "grid gap-px sm:grid-cols-3"}`}
        >
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              data-reveal
              className={
                isRows
                  ? "grid gap-4 bg-surface p-8 sm:grid-cols-[8rem_1fr_1.4fr] sm:items-baseline sm:p-10"
                  : "bg-surface p-8 sm:p-10"
              }
            >
              <p className="label-text text-muted">0{i + 1}</p>
              <h3 className={`display-md ${isRows ? "" : "mt-8"}`}>{value.title}</h3>
              <p className={`text-sm leading-relaxed text-muted ${isRows ? "" : "mt-4"}`}>
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
