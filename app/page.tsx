import Entrance from "@/components/sections/Entrance";
import VerseBand from "@/components/sections/VerseBand";
import Statement from "@/components/sections/Statement";
import LatestWork from "@/components/sections/LatestWork";
import VisualWorld from "@/components/sections/VisualWorld";
import Invitation from "@/components/sections/Invitation";
import ScrollReveals from "@/components/ScrollReveals";
import { getFeaturedEvents, getVideos } from "@/lib/sanity/queries";

export default async function Home() {
  const [tiles, videos] = await Promise.all([getFeaturedEvents(), getVideos()]);

  return (
    <main>
      <Entrance />
      <VerseBand />
      <Statement />
      <LatestWork slides={videos} />
      <VisualWorld tiles={tiles} />
      <Invitation />
      <ScrollReveals />
    </main>
  );
}
