import PlaceholderImage from "@/components/PlaceholderImage";

export default function VisualWorld() {
  return (
    <section className="relative bg-off-white px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="label-text mb-10 text-deep-brown">
          the visual world
        </div>

        <div className="grid auto-rows-[110px] grid-cols-6 gap-4 sm:auto-rows-[130px] sm:gap-5">
          <div data-reveal className="relative col-span-6 row-span-4 sm:col-span-4">
            <PlaceholderImage
              label="the collective, together"
              variant={1}
              className="h-full w-full"
            />
          </div>
          <div data-reveal className="relative col-span-3 row-span-2 sm:col-span-2">
            <PlaceholderImage
              label="wheat field, golden hour"
              variant={3}
              className="h-full w-full"
            />
          </div>
          <div data-reveal className="relative col-span-3 row-span-2 sm:col-span-2">
            <PlaceholderImage
              label="one voice, mid-song"
              variant={0}
              className="h-full w-full"
            />
          </div>
          <div data-reveal className="relative col-span-2 row-span-3 sm:col-span-2">
            <PlaceholderImage
              label="hands on strings"
              variant={2}
              className="h-full w-full"
            />
          </div>
          <div data-reveal className="relative col-span-4 row-span-3 sm:col-span-4">
            <PlaceholderImage
              label="three friends walking, dusk"
              variant={1}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
