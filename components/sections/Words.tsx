export default function Words() {
  return (
    <section className="on-sand relative overflow-hidden py-24 sm:py-32">
      <div className="grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <p data-reveal className="label-text text-muted">
          the word
        </p>
        <blockquote data-reveal className="display-md mt-7">
          &ldquo;let the word of Christ dwell in you richly, teaching and
          admonishing one another in all wisdom,{" "}
          <span className="accent-word text-deep-brown">singing</span>{" "}
          psalms and hymns and spiritual songs, with thankfulness in your
          hearts to God.&rdquo;
        </blockquote>
        <p data-reveal className="mt-6 label-text text-muted">
          colossians 3:16
        </p>
      </div>
    </section>
  );
}
